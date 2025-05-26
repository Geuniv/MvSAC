import datetime
from typing import Optional
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

# 전입 신고 등록 모델
class MoveInInfo(SQLModel, table = True):
    name: str
    rrn: str
    email: EmailStr
    beforeAddr: str
    afterAddr: str
    regDt: datetime.datetime
    approvalDt: Optional[datetime.datetime]
    moveInDt: datetime.date
    isApproval: bool = Field(default= None)
    userId: int = Field(foreign_key="user.id")

# 전입 신고 수정 모델
class MoveInInfoUpdate(SQLModel):
    name: Optional[str]
    rrn: Optional[str]
    email: Optional[EmailStr]
    beforeAddr: Optional[str]
    afterAddr: Optional[str]
    regDt: Optional[datetime.datetime]
    approvalDt: Optional[datetime.datetime]
    moveInDt: Optional[datetime.date]
    isApproval: Optional[bool]   