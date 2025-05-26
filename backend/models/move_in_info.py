from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, date

class MoveInInfo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    # username: str
    name: str
    rrn: str
    email: str
    beforeAddr: str
    afterAddr: str
    regDt: datetime
    approvalDt: Optional[datetime] = None
    moveInDt: date
    isApproval: Optional[bool] = None
    userId: str 
    #Foreign Key 설정 미흡

class User(SQLModel, table = True):
    id: str = Field(primary_key=True)
    username: str
    email: str
    password: str
    role: str
    file: str
    regDt: datetime