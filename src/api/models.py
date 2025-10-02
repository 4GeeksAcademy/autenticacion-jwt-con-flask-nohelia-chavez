from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)  # (simple para el ejercicio)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    def serialize(self):
        return {"id": self.id,
                "email": self.email, 
                "is_active": self.is_active}