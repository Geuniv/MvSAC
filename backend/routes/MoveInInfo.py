import datetime
import json
from fastapi import APIRouter, Body, Depends, Form, Path, HTTPException, status
from sqlmodel import select
from sqlmodel import Session
from typing import List, Optional
from fastapi import Query
from auth.authenticate import authenticate
from database.connection import get_session
from models.MoveInInfo import MoveInInfo, MoveInInfoUpdate, MoveInCreate
from models.users import User

moveininfo_router = APIRouter(tags=["MoveIn"])

# 전입 신고 등록
@moveininfo_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_movein(
    data = Form(...),
    user_id = Depends(authenticate),     
    session = Depends(get_session) 
) -> dict:
    
    data = json.loads(data)
    data = MoveInCreate(**data)

    data.regDt = datetime.now()
    data.userId = user_id
    session.add(data)
    session.commit()
    session.refresh(data)

    return {"message": "전입 신고 등록이 완료되었습니다."}

# 신고 내역 삭제
@moveininfo_router.delete("/{moveIn_id}")
async def delete_movein(moveIn_id: int, session = Depends(get_session)) -> dict:
    moveIn = session.get(MoveInInfo, moveIn_id)
    if moveIn:
        session.delete(moveIn)
        session.commit()
        return {"message": "해당 전입 신고 내역이 삭제되었습니다."}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="데이터가 존재하지 않습니다."
    )

# 신고 내역 수정
@moveininfo_router.put("/{moveIn_id}", response_model=MoveInInfo)
async def update_event(data: MoveInInfoUpdate, moveIn_id: int = Path(...), session = Depends(get_session)) -> MoveInInfo:
    moveIn = session.get(MoveInInfo, moveIn_id)
    if moveIn:
        moveIn_data = data.model_dump(exclude_unset=True)

        for key, value in moveIn_data.items():
            setattr(moveIn, key, value)

        session.add(moveIn)
        session.commit()    
        session.refresh(moveIn)

        return {"message": "해당 전입 신고 내역의 수정이 완료되었습니다."}
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="일치하는 전입 신고 내역을 찾을 수 없습니다."
    )

# 전입신청 목록 (검색 포함)
@moveininfo_router.get("/", response_model=List[MoveInInfo])
def list_moveins(name: Optional[str] = Query(None), session: Session = Depends(get_session),
                 user_id: int = Depends(authenticate)):
    query = select(MoveInInfo)
    if name:
        # query = query.where(MoveInInfo.username.contains(name))
        query = query.where(MoveInInfo.name.contains(name))
        # query = select(MoveInInfo).where(MoveInInfo.userId == user_id)

    print(query)        
    return session.exec(query).all()

# 전입신청 상세조회
@moveininfo_router.get("/{movein_id}", response_model=MoveInInfo)
def detail_movein(movein_id: int, session: Session = Depends(get_session),
                  user_id: int = Depends(authenticate)):
    movein = session.get(MoveInInfo, movein_id)
    if not movein:
        raise HTTPException(status_code=404, detail="해당 신청 정보를 찾을 수 없습니다.")
    
    # if movein.userId != user_id:
    #     raise HTTPException(status_code=403, detail="해당 데이터에 접근할 권한이 없습니다.")
    
    return movein