import enum, datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Numeric, Enum, String
from sqlalchemy.orm import relationship
from backend.app.db.base import Base


class TransactionType(str, enum.Enum):
    expense = "expense"
    income = "income"


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    description = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.datetime.now(datetime.UTC), nullable=False)

    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")
