from typing import List, Optional, TYPE_CHECKING
from pydantic import BaseModel, EmailStr
from sqlmodel import Field, Relationship, SQLModel, Column
from sqlalchemy import String, CheckConstraint, DateTime
from datetime import datetime
# from models.events import Event

# TYPE_CHECKING을 사용하여 순환 참조를 방지합니다.
# if TYPE_CHECKING:
#     from models.events import Event

# 실제 DB의 User 테이블을 정의하는 모델
class User(SQLModel, table=True):
    __tablename__ = "User"  # ✅ 대문자 그대로 사용되도록 명시

    # 사용자 고유 ID (자동 증가, 기본키)
    id: Optional[int] = Field(default=None, primary_key=True)

    # 사용자 이름 (최대 100자, 필수)
    username: str = Field(nullable=False, max_length=100)

    # 이메일 주소 (고유, 필수, 최대 255자)
    email: EmailStr = Field(sa_column=Column(String(255), nullable=False, unique=True))

    # 비밀번호 (해시 형태로 저장, 필수)
    password: str = Field(nullable=False, max_length=255)

    # 역할: 'Y' 또는 'N'만 허용 (CHAR(1), 필수)
    role: str = Field(
        sa_column=Column(String(1), nullable=False, default="N")
    )

    # 첨부 파일 경로 또는 파일명 (선택, 최대 255자)
    file: Optional[str] = Field(default=None, max_length=255)

    # 생성일시 (기본값: 현재 시간)
    created_at: Optional[datetime] = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime, default=datetime.utcnow)
    )

    # 추가적인 제약조건: role은 'Y' 또는 'N'만 허용
    __table_args__ = (
        CheckConstraint("role IN ('Y', 'N')", name="ck_user_role_yn"),
    )

# 📌 로그인 요청을 받을 때 사용하는 입력 모델
class UserSignIn(SQLModel):
    email: EmailStr     # 로그인 이메일
    password: str       # 로그인 비밀번호

# 📌 회원가입 요청을 받을 때 사용하는 입력 모델
class UserSignUp(SQLModel):
    email: EmailStr     # 회원가입 이메일
    password: str       # 회원가입 비밀번호
    username: str       # 회원 이름
    role: str = Field(default="user")  # 사용자 권한 (기본값: user)
    file: Optional[str] = Field(default=None, alias="file")  # 첨부 파일 경로 또는 이름
    regDt: Optional[str] = Field(default=None, alias="reg_dt")  # 등록일 (예: 회원가입 일시)