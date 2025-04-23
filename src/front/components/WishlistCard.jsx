import React, { useState } from "react";
import rigoPhoto from "../assets/img/rigo-baby.jpg";
import "../css/WishlistCard.css";

const WishlistCard = ({ item, onRemove, onAddToItinerary, apiKey }) => {
    const [note, setNote] = useState("");

    const handleAddToItinerary = () => {
        onAddToItinerary(item, note);
        setNote(""); // Optional reset
    };

    return (
        <div className="card shadow-sm position-relative wishlist-card">
            <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${apiKey}`}
                className="card-img-top wishlist-card-img"
                alt={item.name}
                onError={(e) => (e.target.src = rigoPhoto)}
            />

            {/* Heart button */}
            <button
                className="btn btn-light position-absolute top-0 end-0 m-2 p-1 rounded-circle shadow-sm wishlist-remove-btn"
                onClick={() => onRemove(item.place_id)}
                title="Remove from wishlist"
            >
                <i className="bi bi-heart-fill text-danger"></i>
            </button>

            <div className="card-body p-3 d-flex flex-column justify-content-between">
                <h6 className="card-title">{item.name}</h6>
                <div>
                    <textarea
                        className="form-control wishlist-note"
                        rows="2"
                        placeholder="Add a note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <button
                        className="btn btn-sm btn-outline-primary mt-2"
                        onClick={handleAddToItinerary}
                    >
                        <i className="bi bi-suitcase2-fill me-1"></i> Add to Itinerary
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;
