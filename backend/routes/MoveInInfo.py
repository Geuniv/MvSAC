import datetime
import json
from fastapi import APIRouter, Body, Depends, Form, Path, HTTPException, status
from sqlmodel import select
from auth.authenticate import authenticate
from database.connection import get_session
from models.MoveInInfo import MoveInInfo, MoveInInfoUpdate

moveininfo_router = APIRouter(tags=["MoveIn"])


# 전입 신고 등록
@moveininfo_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_movein(
    data = Form(...),
    user_id = Depends(authenticate),     
    session = Depends(get_session) 
) -> dict:
    
    data = json.loads(data)
    data = MoveInInfo(**data)

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