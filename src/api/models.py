from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from datetime import datetime
from typing import Optional

# Initialize database and encryption
db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = "users"

   
    id: Mapped[int] = mapped_column(
        db.Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    email: Mapped[str] = mapped_column(
        db.String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(db.String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        db.DateTime, default=datetime.utcnow)

    def set_password(self, password: str) -> None:
        """Hashes and stores the password"""
        self.password_hash = bcrypt.generate_password_hash(
            password).decode('utf-8')

    def check_password(self, password: str) -> bool:
        """Verifies if the given password matches the stored hash."""
        return bcrypt.check_password_hash(self.password_hash, password)

    def generate_token(self) -> str:
        """Generate a JWT authentication token."""
        return create_access_token(identity={"id": self.id, "email": self.email})

    def serialize(self) -> dict:
        """Returns user data without the password."""
        return {"id": self.id, "name": self.name, "email": self.email}


class Itinerary(db.Model):
    # __table__= "itinerary"
    id: Mapped[int] = mapped_column(primary_key=True)
    

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    start_date: Mapped[str]= mapped_column(nullable=False)
    end_date: Mapped[str]= mapped_column(nullable=False)

    location: Mapped[str]= mapped_column(nullable=False)

    
    hotel_name: Mapped[str] = mapped_column(nullable=True)
    hotel_location: Mapped[str] = mapped_column(nullable=True)
    
    attraction_name: Mapped[str] = mapped_column(nullable=True)
    attraction_location: Mapped[str] = mapped_column(nullable=True)

    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "location":self.location,
            "hotel_name": self.hotel_name,
            "hotel_location": self.hotel_location,
            "attraction_name": self.attraction_name,
            "attraction_location": self.attraction_location
        }



