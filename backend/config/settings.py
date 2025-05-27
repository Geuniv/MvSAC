# 📁 config/settings.py
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()  # .env 파일 읽기

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL")
    secret_key: str = os.getenv("SECRET_KEY")

    # Naver Cloud Platform 설정
    ncp_access_key: str = os.getenv("NCP_ACCESS_KEY")
    ncp_secret_key: str = os.getenv("NCP_SECRET_KEY")
    bucket_name: str = os.getenv("BUCKET_NAME")
    endpoint_url: str = os.getenv("ENDPOINT_URL")

    class Config:
        env_file = ".env"

settings = Settings()