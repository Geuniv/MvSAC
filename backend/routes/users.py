from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
from models.move_in_info import User  # 모델 경로는 move_in_info에 정의된 User 사용
from database.connection import get_session

router = APIRouter(tags=["User"])

# 사용자 목록 조회
@router.get("/", response_model=List[User])
def list_users(session: Session = Depends(get_session)):
    query = select(User)
    return session.exec(query).all()

# 사용자 상세 조회
@router.get("/{user_id}", response_model=User)
def detail_user(user_id: str, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="해당 사용자를 찾을 수 없습니다.")
    return user
