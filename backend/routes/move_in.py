from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
from models.move_in_info import MoveInInfo
from database.connection import get_session

# router = APIRouter(prefix="/movein", tags=["MoveIn"])

router = APIRouter(tags=["MoveIn"])
# 전입신청 목록 (검색 포함)
@router.get("/", response_model=List[MoveInInfo])
def list_moveins(name: Optional[str] = Query(None), session: Session = Depends(get_session)):
    query = select(MoveInInfo)
    if name:
        query = query.where(MoveInInfo.username.contains(name))
        # query = query.where(MoveInInfo.name.contains(name))
    return session.exec(query).all()

# 전입신청 상세조회
@router.get("/{movein_id}", response_model=MoveInInfo)
def detail_movein(movein_id: int, session: Session = Depends(get_session)):
    movein = session.get(MoveInInfo, movein_id)
    if not movein:
        raise HTTPException(status_code=404, detail="해당 신청 정보를 찾을 수 없습니다.")
    return movein
