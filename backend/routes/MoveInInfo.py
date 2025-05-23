import json
from fastapi import APIRouter, Depends, Form, Path, status, HTTPException
from models.MoveInInfo import MoveInInfo, MoveInInfoUpdate

moveininfo_router = APIRouter(tags=["MoveIn"])


# 전입 신고 등록
@moveininfo_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_movein(
    data = Form(...),
):
    
    data = json.loads(data)
    data = MoveInInfo(**data)

    return {"message": "전입 신고 등록이 완료되었습니다."}

# 신고 내역 삭제
@moveininfo_router.delete("/{movein_id}")
async def delete_movein(movein_id: int):

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="데이터가 존재하지 않습니다."
    )

@moveininfo_router.put("/{event_id}", response_model=MoveInInfo)
async def update_event(data: MoveInInfoUpdate, event_id: int = Path(...), session = Depends(get_session)) -> MoveInInfo:
    
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="일치하는 이벤트를 찾을 수 없습니다."
    )