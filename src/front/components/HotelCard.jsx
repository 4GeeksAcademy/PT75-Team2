import React from "react";
import { useTripSyncContext } from "../../contextapi";
import rigoPhoto from "../assets/img/rigo-baby.jpg";
import "../css/HotelCard.css";

export const HotelCard = ({
    hotel,
    onToggleWishlist,
    isWishlisted,
}) => {
    const { handleAddToWishlist, handleAddToItinerary } = useTripSyncContext();



    const photoUrl =
        hotel?.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            : rigoPhoto;

    return (
        <div
            className="card shadow-sm position-relative border-0 hotel-card"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <div className="position-relative">
                <img
                    src={photoUrl}
                    alt={hotel.name}
                    onError={(e) => (e.target.src = rigoPhoto)}
                    className="card-img-top hotel-img"
                />

                <button
                    className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-circle shadow-sm wishlist-btn"
                    onClick={() => {
                        handleAddToWishlist(hotel, isWishlisted, "hotel");
                        onToggleWishlist(hotel);
                    }}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <i
                        className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"}`}
                    ></i>
                </button>
                <button
                    className="btn btn-sm btn-primary w-100 mt-2"

                    onClick={() => { handleAddToItinerary(hotel) }}
                >
                    <i className="bi bi-suitcase2-fill me-1" ></i> Add to Itinerary
                </button>
            </div>

            <div className="card-body px-3 pt-0 pb-2 d-flex flex-column">
                <h6 className="card-title mb-1">{hotel.name}</h6>
                <p className="text-muted small mb-2">{hotel.vicinity}</p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="badge bg-light text-dark px-2 py-1">
                        ⭐ {hotel.rating || "N/A"}
                    </span>

                    <a
                        className="btn btn-sm btn-outline-primary"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}&query_place_id=${hotel.place_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-geo-alt-fill me-1"></i> Maps
                    </a>
                </div>
            </div>
        </div>
    );
};
