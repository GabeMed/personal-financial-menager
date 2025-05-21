from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.dependencies import get_db
from backend.app.db import crud
from backend.app.schemas.user import UserCreate, UserResponse
from backend.app.auth import auth_service

router = APIRouter()


@router.post(
    "/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(400, "Username already registered")
    new_user = crud.create_user(db, user)
    return new_user


@router.get("/users/me", response_model=UserResponse)
def read_current_user(
    current_user: UserResponse = Depends(auth_service.get_current_user),
):
    return current_user
