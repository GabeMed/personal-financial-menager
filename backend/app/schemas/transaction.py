from datetime import UTC, datetime
from decimal import Decimal
from pydantic import BaseModel
from backend.app.schemas.category import CategoryResponse
from typing import Literal


class TransactionBase(BaseModel):
    type: Literal["expense", "income"]
    amount: Decimal
    description: str | None = None
    date: datetime = datetime.now(UTC)
    category_id: int


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    type: str | None = None
    amount: Decimal | None = None
    description: str | None = None
    date: datetime | None = None
    category_id: int | None = None


class TransactionResponse(TransactionBase):
    id: int
    amount: Decimal
    category: CategoryResponse

    class Config:
        orm_mode = True
