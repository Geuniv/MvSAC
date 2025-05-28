<<<<<<< HEAD
from config.settings import settings  # 설정 인스턴스 import
from sqlmodel import SQLModel, create_engine, Session  # SQLModel 및 세션 관련 모듈 import
from sqlalchemy.orm import sessionmaker
from models.users import User  # User 모델 import
from models.MoveInInfo import MoveInInfo  # 전입 신고 모델 import
from models.files import Files  # 파일 모델 import

# settings에서 불러온 DB URL로 엔진 생성
engine = create_engine(settings.database_url, echo=True)

# 테이블 생성
def conn():
    SQLModel.metadata.create_all(engine)

# 세션 제공
def get_session():
    with Session(engine) as session:
        yield session

# 세션 로컬 생성
SessionLocal = sessionmaker(bind=engine, class_=Session, autocommit=False, autoflush=False)
=======
# 데이터베이스 설정
from typing import Optional
from pydantic_settings import BaseSettings
from sqlmodel import SQLModel, create_engine, Session

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
>>>>>>> a5fb0f7db71cfbcfb0fb953782c3579e97dbbb27
