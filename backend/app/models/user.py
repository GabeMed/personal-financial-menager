from sqlalchemy import Column, Integer, String
from backend.app.db.base import Base
from backend.app.db.base import engine


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)


User.metadata.create_all(bind=engine)
