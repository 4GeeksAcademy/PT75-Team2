from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
   
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

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



