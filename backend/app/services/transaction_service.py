from sqlalchemy.orm import Session
from app.crud.crud_transaction import (
    get_transactions,
    create_transaction,
    update_transaction,
    delete_transaction,
)
from app.schemas.transaction import TransactionCreate, TransactionUpdate


def list_transactions(db: Session, user_id: int, skip: int = 0, limit: int = 25):
    """* Returns all the transactions stored by a User.
    * Limits to 25 transactions per page
    """
    return get_transactions(db, user_id, skip, limit)


def add_transaction(db: Session, user_id: int, transaction_in: TransactionCreate):
    """* Creates a new transaction"""
    return create_transaction(db, user_id, transaction_in)


def modify_transaction(db: Session, transaction, transaction_in: TransactionUpdate):
    """* Updates an existing transaction (patch)."""
    return update_transaction(db, transaction, transaction_in)


def remove_transaction(db: Session, transaction):
    """* Deletes a existing transaction"""
    delete_transaction(db, transaction)
