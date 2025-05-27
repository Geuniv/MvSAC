import datetime
from typing import Optional, TYPE_CHECKING
from pydantic import EmailStr
from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from models.users import User

# 전입 신고 등록 모델
class MoveInCreate(SQLModel, table = True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    rrn: str
    email: EmailStr
    beforeAddr: str
    afterAddr: str
    regDt: datetime.datetime
    approvalDt: Optional[datetime.datetime]
    moveInDt: Optional[datetime.datetime]
    isApproval: bool = Field(default= None)
    user_id: Optional[int] = Field(default=None, foreign_key="User.id")

# 전입 신고 수정 모델
class MoveInInfoUpdate(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str]
    rrn: Optional[str]
    email: Optional[EmailStr]
    beforeAddr: Optional[str]
    afterAddr: Optional[str]
    regDt: Optional[datetime.datetime]
    approvalDt: Optional[datetime.datetime]
    moveInDt: Optional[datetime.date]
    isApproval: Optional[bool]   

class MoveInInfo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    # username: str
    name: str
    rrn: str
    email: str
    beforeAddr: str
    afterAddr: str
    regDt: Optional[datetime.datetime]
    approvalDt: Optional[datetime.datetime] = None
    moveInDt: Optional[datetime.datetime]
    isApproval: Optional[bool] = None
    user_id: Optional[int] = Field(default=None, foreign_key="User.id")

# class User(SQLModel, table = True):
#     id: str = Field(primary_key=True)
#     username: str
#     email: str
#     password: str
#     role: str
#     file: str
#     regDt: Optional[datetime.datetime]