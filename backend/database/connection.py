# 데이터베이스 설정
from typing import Optional
from pydantic_settings import BaseSettings
from sqlmodel import SQLModel, create_engine, Session
from models.move_in_info import MoveInInfo, User  # 모델 import

class Settings(BaseSettings):
    DATABASE_URL: Optional[str] =  None
    SECRET_KEY: Optional[str] = None

    class Config:
        env_file = ".env"

# 인스턴스 생성
settings = Settings()

engine_url = create_engine(
    settings.DATABASE_URL,
    echo = True,  # SQLAlchemy 쿼리 로깅을 활성화합니다.
)

# 테이블 생성
def conn():
    SQLModel.metadata.create_all(engine_url)

# 세션 제공 함수
def get_session():
    with Session(engine_url) as session:
        yield session