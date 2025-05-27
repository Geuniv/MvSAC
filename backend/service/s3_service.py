from config.settings import settings
import boto3
from uuid import uuid4
from pathlib import Path
import mimetypes
from datetime import datetime
from botocore.exceptions import NoCredentialsError, ClientError, BotoCoreError

# S3 클라이언트 생성
s3 = boto3.client(
    "s3",
    aws_access_key_id=settings.ncp_access_key,
    aws_secret_access_key=settings.ncp_secret_key,
    endpoint_url=settings.endpoint_url
)

# 업로드 함수
def upload_file_to_ncp(file_obj, filename: str) -> str:
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
            ExtraArgs={"ACL": "public-read", "ContentType": content_type}
        )
        print("[✅ 업로드 성공]")

        # BEFORE (잘못된 방식) buecket_name이 두번 들어감 지금
        # return f"{settings.endpoint_url}/{settings.bucket_name}/{key}"

        # AFTER (올바른 방식)
        return f"{settings.endpoint_url}/{key}"

    except (NoCredentialsError, ClientError, BotoCoreError) as e:
        print(f"{settings.endpoint_url}/{key}")
        print(f"[❌ 업로드 실패]: {str(e)}")
        raise RuntimeError(f"NCP 파일 업로드 실패: {str(e)}")