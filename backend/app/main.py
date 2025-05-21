from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core import config
from backend.app.api.v1.router import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
