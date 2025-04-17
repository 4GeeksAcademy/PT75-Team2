import React from "react";
import rigoPhoto from "../assets/img/rigo-baby.jpg";
import "../css/WishlistCard.css";

const WishlistCard = ({ item, onRemove, onAddToItinerary, apiKey }) => {
    return (
        <div
            className="card shadow-sm position-relative wishlist-card"
        >
            <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${apiKey}`}
                className="card-img-top wishlist-card-img"
                alt={item.name}
                onError={(e) => (e.target.src = rigoPhoto)}
            />

            {/* Remove from Wishlist */}
            <button
                className="btn btn-light position-absolute top-0 end-0 m-2 p-1 rounded-circle shadow-sm wishlist-remove-btn"
                onClick={() => onRemove(item.place_id)}
                title="Remove from wishlist"
            >
                <i className="bi bi-heart-fill text-danger"></i>
            </button>

            <div className="card- p-3">
                <h6 className="card-title">{item.name}</h6>
                <p className="text-muted small">{item.address}</p>
            </div>
        </div>
    );
};

export default WishlistCard;
