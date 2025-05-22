from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.v1 import auth, users, categories, transactions
from backend.app.core import config
from backend.app.db.base import Base, engine
import backend.app.models.user
import backend.app.models.category
import backend.app.models.transaction

Base.metadata.create_all(bind=engine)

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
api_router.include_router(categories.router)
api_router.include_router(transactions.router)

app.include_router(api_router)
