from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.v1 import auth, users
from backend.app.core import config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth.router)
api_router.include_router(users.router)

app.include_router(api_router)
