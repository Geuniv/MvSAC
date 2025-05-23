from fastapi import FastAPI
from routes.MoveInInfo import moveininfo_router

app = FastAPI()


app.include_router(moveininfo_router, prefix="/movein")

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
