import datetime
from typing import Optional
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

# 전입 신고 등록 모델
class MoveInInfo(SQLModel, table = True):
    name: str
    rrn: str
    email: EmailStr
    beforeMoveInAdd: str
    afterMoveInAdd: str
    regDate: datetime.datetime
    approvalDate: Optional[datetime.datetime]
    moveInDate: datetime.date
    isApproval: bool = Field(default= None)
    userId: int = Field(foreign_key="user.id")

# 전입 신고 수정 모델
class MoveInInfoUpdate(SQLModel):
    name: Optional[str]
    rrn: Optional[str]
    email: Optional[EmailStr]
    beforeMoveInAdd: Optional[str]
    afterMoveInAdd: Optional[str]
    regDate: Optional[datetime.datetime]
    approvalDate: Optional[datetime.datetime]
    moveInDate: Optional[datetime.date]
    isApproval: Optional[bool]   