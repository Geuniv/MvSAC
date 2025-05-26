from fastapi import FastAPI
from routes.move_in import router as movein_router
from routes.users import router as user_router 
from database.connection import conn

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)



# 전입신청 라우터 등록
app.include_router(movein_router, prefix="/movein")
# app.include_router(user_router, prefix="/user")

# 직접 실행 시 uvicorn으로 서버 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)