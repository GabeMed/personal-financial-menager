from decimal import Decimal
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    balance: Decimal

    class Config:
        orm_mode = True


##TODO add user update, just like I did with the other entities
