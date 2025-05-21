from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from backend.app.core import config
from backend.app.core.security import verify_password
from backend.app.crud import crud_user
from backend.app.db import session
from backend.app.core.oauth2 import oauth2_scheme
from fastapi import Depends, HTTPException, status


def authenticate_user(db: Session, username: str, password: str):
    user = crud_user.get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    payload = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    payload.update({"exp": expire})
    encoded_jwt = jwt.encode(payload, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid Credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        username: str | None = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(session.get_db)
):
    username = verify_token(token)
    user = user.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    return user
