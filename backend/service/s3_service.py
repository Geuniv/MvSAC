import boto3
from uuid import uuid4
from pathlib import Path
import mimetypes
from config.settings import settings
from datetime import datetime
from botocore.exceptions import NoCredentialsError, ClientError, BotoCoreError

# S3 클라이언트 생성
s3 = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key,
    aws_secret_access_key=settings.aws_secret_key,
    region_name="ap-northeast-2",
    endpoint_url=settings.endpoint_url
)

# 업로드 함수
def upload_file_to_s3(file_obj, filename: str) -> str:
    try:
        print("[📤 S3 업로드 시작]")
        ext = Path(filename).suffix

        now = datetime.utcnow()
        folder_path = f"uploads/{now.year}/{now.strftime('%m/%d')}"
        key = f"{folder_path}/{uuid4().hex}{ext}"
        print(f"[🔑 키 생성됨] key = {key}")

        content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"
        print(f"[🧾 타입] = {content_type}")

        s3.upload_fileobj(
            file_obj,
            settings.bucket_name,
            key,
            # ExtraArgs={"ContentType": content_type, "ACL": "public-read"}  # 공개 접근 허용
            ExtraArgs={"ContentType": content_type}  # ✅ ACL 제거
        )
        print("[✅ 업로드 성공]")

        return f"{settings.endpoint_url}/{settings.bucket_name}/{key}"

    except (NoCredentialsError, ClientError, BotoCoreError) as e:
        print(f"{settings.endpoint_url}/{settings.bucket_name}/{key}")
        print(f"[❌ 업로드 실패]: {str(e)}")
        raise RuntimeError(f"S3 파일 업로드 실패: {str(e)}")