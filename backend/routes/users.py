import os
import json
import shutil
from pathlib import Path
from datetime import datetime

import mimetypes
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status, Form, UploadFile, File, Header
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select, Session
from typing import List, Optional

from models.users import User
from models.files import Files
from database.connection import get_session
from auth.hash_password import HashPassword
from auth.jwt_handler import create_jwt_token, verify_jwt_token
from service.s3_service import upload_file_to_ncp

# tag은 API 문서화에 사용되는 태그 ( docs 상에 같은 태그로 묶임 )
user_router = APIRouter(tags=["User"])

# 비밀번호 해시 유틸
hash_password = HashPassword()  

# FILE_DIR = FilePath("C:/temp/uploads")
# 맥 기준 홈 디렉토리
# FILE_DIR = FilePath.home() / "uploads"
# 현재 프로젝트의 현재 경로 기준 상위 폴더에 uploads 폴더 생성
# FILE_DIR = FilePath(__file__).resolve().parent / "../uploads"
# FILE_DIR.mkdir(exist_ok=True)

# 회원가입 API
@user_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def sign_new_user(
    data: str = Form(...),
    image: Optional[UploadFile] = File(None),
    session: Session = Depends(get_session)
) -> dict:
    # JSON 파싱
    try:
        parsed = json.loads(data)
        email = parsed.get("email")
        if not email:
            raise ValueError("이메일이 누락되었습니다.")
    except Exception:
        raise HTTPException(status_code=400, detail="요청 데이터 형식이 잘못되었습니다.")

    # 이메일 중복 검사
    existing_user = session.exec(select(User).where(User.email == email)).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="동일한 사용자가 존재합니다.")

    # 사용자 등록 (flush로 ID 확보)
    new_user = User(
        username=parsed.get("username"),
        email=email,
        password=hash_password.hash_password(parsed.get("password")),
        role=parsed.get("role", "N"),
        created_at=datetime.utcnow()
    )
    session.add(new_user)
    session.flush()  # ID 확보 (commit은 나중에 한 번만)

    # 이미지 업로드 및 파일 테이블 저장
    file_url = None
    if image:
        try:
            file_url = upload_file_to_ncp(image.file, image.filename)

            file_name = os.path.basename(file_url)
            file_path = "/".join(file_url.split("/")[:-1])
            org_file_name = image.filename

            image.file.seek(0, 2)
            size = image.file.tell()
            image.file.seek(0)
            file_size = str(size)

            print(file_url, "\n", file_name, "\n", file_path, "\n", org_file_name, "\n", file_size)

            new_file = Files(
                user_id=new_user.id,
                file_name=file_name,
                file_path=file_path,
                org_file_name=org_file_name,
                file_size=file_size,
                file_url=file_url
            )
            session.add(new_file)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"파일 업로드 실패: {str(e)}")

    session.commit()

    return {
        "message": "사용자 등록이 완료되었습니다.",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role,
            "profile_image_url": file_url  # None일 수도 있음
        }
    }

# 사용자 로그인
@user_router.post("/signin")
async def sign_in(data: OAuth2PasswordRequestForm = Depends(), session = Depends(get_session)) -> dict:
    statement = select(User).where(User.email == data.username)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="사용자를 찾을 수 없습니다.")    

    # if user.password != data.password:
    if hash_password.verify_password(data.password, user.password) == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="패스워드가 일치하지 않습니다.")
    
    return {
        "message": "로그인에 성공했습니다.",
        "username": user.username,
        "user_id": user.id, #추가
        "email": user.email, #추가
        "access_token": create_jwt_token(user.email, user.id)
    }

@user_router.get("/profile")
def get_profile(Authorization: str = Header(...), session: Session = Depends(get_session)):
    try:
        # Bearer 토큰에서 토큰만 추출
        token = Authorization.replace("Bearer ", "")
        payload = verify_jwt_token(token)
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="토큰이 유효하지 않습니다.")

        # 사용자 조회
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

        # 프로필 이미지 조회 (없을 수도 있음)
        file = session.exec(select(Files).where(Files.user_id == user.id)).first()

        return {
            "email": user.email,
            "username": user.username,
            "profile_image_url": file.file_url if file else None
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

# # 사용자 목록 조회
# @user_router.get("/", response_model=List[User])
# def list_users(session: Session = Depends(get_session)):
#     query = select(User)
#     return session.exec(query).all()

# # 사용자 상세 조회
# @user_router.get("/{user_id}", response_model=User)
# def detail_user(user_id: str, session: Session = Depends(get_session)):
#     user = session.get(User, user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="해당 사용자를 찾을 수 없습니다.")
#     return user
