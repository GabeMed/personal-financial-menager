from datetime import date
from sqlalchemy import func
from sqlalchemy.orm import Session
from backend.app.models.transaction import Transaction, TransactionType
from backend.app.models.user import User


def get_summary(db: Session, user_id: int, start: date | None, end: date | None):
    q = db.query(Transaction).filter(Transaction.user_id == user_id)
    if start:
        q = q.filter(Transaction.date >= start)
    if end:
        q = q.filter(Transaction.date <= end)

    totals = (
        q.with_entities(Transaction.type, func.sum(Transaction.amount).label("total"))
        .group_by(Transaction.type)
        .all()
    )
    by_category = (
        q.with_entities(
            Transaction.type,
            Transaction.category_id,
            func.sum(Transaction.amount).label("total"),
        )
        .group_by(Transaction.type, Transaction.category_id)
        .all()
    )

    total_income = sum(t.total for t in totals if t.type == TransactionType.income)
    total_expense = sum(t.total for t in totals if t.type == TransactionType.expense)

    def porcentage_map(transaction_type, grand_total):
        return {
            r.category_id: (r.total / grand_total * 100)
            for r in by_category
            if r.type == transaction_type
        }

    return {
        "balance": db.get(User, user_id).balance,
        "income_total": total_income,
        "expense_total": total_expense,
        "income_porcentage_by_category": (
            porcentage_map(TransactionType.income, total_income) if total_income else {}
        ),
        "expense_porcentage_by_category": (
            porcentage_map(TransactionType.expense, total_expense)
            if total_expense
            else {}
        ),
    }
