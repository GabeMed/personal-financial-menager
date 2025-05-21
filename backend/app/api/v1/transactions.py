from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.oauth2 import get_current_user
from app.schemas.transaction import (
    TransactionCreate,
    TransactionUpdate,
    TransactionResponse,
)
from app.services.transaction_service import (
    list_transactions,
    add_transaction,
    modify_transaction,
    remove_transaction,
)
from app.models.transaction import Transaction
from backend.app.models.user import User

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.get("/all", response_model=list[TransactionResponse])
def read_transactions(
    skip: int = 0,
    limit: int = 25,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_transactions(db, current_user.id, skip, limit)


@router.post(
    "", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED
)
def create_transaction(
    transaction_in: TransactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return add_transaction(db, current_user.id, transaction_in)


@router.patch("/{transaction_id}", response_model=TransactionResponse)
def update_transaction(
    transaction_id: int,
    transaction_in: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction: Transaction | None = (
        db.query(Transaction)
        .filter(
            Transaction.id == transaction_id,
            Transaction.user_id == current_user.id,
        )
        .first()
    )
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return modify_transaction(db, transaction, transaction_in)


@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction: Transaction | None = (
        db.query(Transaction)
        .filter(
            Transaction.id == transaction_id,
            Transaction.user_id == current_user.id,
        )
        .first()
    )
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    remove_transaction(db, transaction)
