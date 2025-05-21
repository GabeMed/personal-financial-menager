from sqlalchemy.orm import Session
from app.crud.crud_category import get_categories, create_category
from app.schemas.category import CategoryCreate


def list_categories(db: Session, user_id: int):
    """* Returns all the categories defined by a User"""
    return get_categories(db, user_id)


def add_category(db: Session, user_id: int, category_in: CategoryCreate):
    """* Creates a new category.
    * Links this new category to a User.
    """
    return create_category(db, user_id, category_in.name)
