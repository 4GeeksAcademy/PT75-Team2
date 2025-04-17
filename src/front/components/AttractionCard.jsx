import React from "react";
import { useTripSyncContext } from "../../contextapi";
import rigoPhoto from "../assets/img/rigo-baby.jpg";
import "../css/AttractionCard.css";

export const AttractionCard = ({ place, isWishlisted, onToggleWishlist }) => {
    const { handleAddToWishlist, handleAddToItinerary } = useTripSyncContext();

    const {
        name,
        photo_url,
        rating,
        price_level,
        formatted_address,
        place_id,
    } = place;

    return (
        <div
            className="card shadow-sm position-relative border-0 attraction-card"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <div className="position-relative">
                <img
                    src={photo_url}
                    alt={name}
                    className="card-img-top attraction-img"
                    onError={(e) => (e.target.src = rigoPhoto)}
                />

                <button
                    className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-circle shadow-sm wishlist-btn"
                    onClick={() => { handleAddToWishlist(place); onToggleWishlist(place) }}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <i
                        className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"}`}
                    ></i>
                </button>
            </div>

            <div className="card-body px-3 pt-3  d-flex flex-column justify-content-between">
                <div>
                    <h6 className="card-title mb-1 text-truncate" title={name}>{name}</h6>
                    <p className="text-muted small mb-2 text-truncate" title={formatted_address}>
                        {formatted_address}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-light text-dark px-2 py-1">
                            ⭐ {rating || "N/A"}
                        </span>
                        <span className="text-muted small">
                            💰 {price_level ? `$`.repeat(price_level) : "N/A"}
                        </span>
                    </div>
                    <div>
                        <button
                            className="btn btn-sm btn-primary w-100 mt-2 mb-2"

                            onClick={() => { handleAddToItinerary(place) }}
                        >
                            <i className="bi bi-suitcase2-fill me-1" ></i> Add to Itinerary
                        </button>

                        {/* CTA Button at bottom */}
                        <a
                            className="btn btn-sm btn-outline-primary w-100"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                name
                            )}&query_place_id=${place_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-geo-alt-fill me-1"></i> View on Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
