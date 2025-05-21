from backend.app.db.base import SessionLocal
from typing import Generator


def get_db() -> Generator:
    """
    Dependency that provides a database session for the duration of a request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
