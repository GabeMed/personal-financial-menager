from sqlalchemy.orm import Session
from backend.app.models.category import Category


def get_categories(db: Session, user_id: int):
    return db.query(Category).filter(Category.user_id == user_id).all()


def create_category(db: Session, user_id: int, name: str):
    category = Category(user_id=user_id, name=name)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category
