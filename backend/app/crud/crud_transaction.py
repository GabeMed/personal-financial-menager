from sqlalchemy.orm import Session
from backend.app.models.transaction import Transaction, TransactionType
from backend.app.models.user import User
from backend.app.schemas.transaction import TransactionCreate, TransactionUpdate


def get_transactions(db: Session, user_id: int, skip: int = 0, limit: int = 25):
    return (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_transaction(db: Session, user_id: int, transaction_in: TransactionCreate):
    data = transaction_in.model_dump()
    transaction = Transaction(user_id=user_id, **data)

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")

    delta = (
        transaction.amount
        if transaction.type == TransactionType.income
        else -transaction.amount
    )
    user.balance += delta
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


def update_transaction(
    db: Session, transaction: Transaction, transaction_in: TransactionUpdate
):
    old_amount, new_amount = transaction.amount, transaction_in.amount
    update_data = transaction_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(transaction, field, value)

    def get_sign(amount, type):
        return amount if type == TransactionType.income else -amount

    delta = get_sign(new_amount, transaction.type) - get_sign(
        old_amount, transaction.type
    )
    transaction.user.balance += delta
    db.commit()
    db.refresh(transaction)
    db.refresh(transaction.user)
    return transaction


def delete_transaction(db: Session, transaction: Transaction):
    delta = (
        -transaction.amount
        if transaction.type == TransactionType.income
        else transaction.amount
    )
    transaction.user.balance += delta
    db.delete(transaction)
    db.commit()
    db.refresh(transaction.user)
    return transaction.user  ##! I'm pretty sure this is useless, but It's 3am
