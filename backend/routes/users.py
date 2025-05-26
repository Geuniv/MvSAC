import json
from models.users import User
from fastapi import APIRouter, Depends, HTTPException, status, Form, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select
from database.connection import get_session
from auth.hash_password import HashPassword
from auth.jwt_handler import create_jwt_token
# pathlib 모듈의 Path 클래스를 FilePath 이름으로 사용
from pathlib import Path as FilePath
from datetime import datetime
import shutil

# tag은 API 문서화에 사용되는 태그 ( docs 상에 같은 태그로 묶임 )
user_router = APIRouter(tags=["User"])

# 비밀번호 해시 유틸
hash_password = HashPassword()  

# FILE_DIR = FilePath("C:/temp/uploads")
# 맥 기준 홈 디렉토리
# FILE_DIR = FilePath.home() / "uploads"
# 현재 프로젝트의 현재 경로 기준 상위 폴더에 uploads 폴더 생성
FILE_DIR = FilePath(__file__).resolve().parent / "../uploads"
FILE_DIR.mkdir(exist_ok=True)

# 회원가입 API
@user_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def sign_new_user(
    data: str = Form(...),                       # JSON 문자열
    image: UploadFile = File(...),               # 파일 업로드 (사진)
    session = Depends(get_session)               # DB 세션
) -> dict:
    # 1. JSON 문자열을 파싱하여 Pydantic 모델로 변환
    try:
        parsed = json.loads(data)
        email = parsed.get("email")
    except Exception:
        raise HTTPException(status_code=400, detail="요청 데이터 형식이 잘못되었습니다.")

    # 2. 이메일 중복 확인
    existing_user = session.exec(select(User).where(User.email == email)).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="동일한 사용자가 존재합니다.")

    # 3. 이미지 파일 저장
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    ext = FilePath(image.filename).suffix
    file_name = f"{email}_{timestamp}{ext}"
    file_path = FILE_DIR / file_name

    with file_path.open("wb") as f:
        shutil.copyfileobj(image.file, f)

    # 4. 사용자 생성 및 DB 저장
    new_user = User(
        username=parsed.get("username"),
        email=email,
        password=hash_password.hash_password(parsed.get("password")),
        role=parsed.get("role", "N"),
        file=str(file_path),
        created_at=datetime.utcnow()
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {
        "message": "사용자 등록이 완료되었습니다.",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "file": new_user.file,
            "role": new_user.role
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
        "access_token": create_jwt_token(user.email, user.id)
    }