import React from "react";
import { ImageSlider } from "./ImageSlider";
import "../HotelCard.css";

export const HotelCard = ({
    hotel,
    currentPhoto,
    onChangePhoto,
    onToggleWishlist,
    isWishlisted,
}) => {
    const handleAddToWishlist = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to save favorites.");
            return;
        }

        try {
            const method = isWishlisted ? "DELETE" : "POST";
            const endpoint = isWishlisted
                ? `${import.meta.env.VITE_BACKEND_URL}wishlist/${hotel.place_id}`
                : `${import.meta.env.VITE_BACKEND_URL}wishlist`;

            const payload = isWishlisted
                ? null
                : JSON.stringify({
                    place_id: hotel.place_id,
                    name: hotel.name,
                    address: hotel.vicinity,
                    rating: hotel.rating,
                    photo_reference: hotel.photos?.[0]?.photo_reference || "",
                });

            await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                ...(payload && { body: payload }),
            });

            onToggleWishlist(hotel);
        } catch (err) {
            console.error("Wishlist error:", err);
            alert("Something went wrong updating the wishlist.");
        }
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card hotel-card border-0 shadow-sm">
                <div className="hotel-image-container position-relative">
                    <ImageSlider
                        photos={hotel.photos}
                        currentIndex={currentPhoto[hotel.place_id] || 0}
                        onChange={onChangePhoto}
                        placeId={hotel.place_id}
                    />
                    <button
                        className="wishlist-btn"
                        onClick={handleAddToWishlist}
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <i className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart text-light"}`}></i>
                    </button>
                </div>

                <div className="card-body">
                    <h5 className="card-title mb-1">{hotel.name}</h5>
                    <p className="text-muted small mb-2">{hotel.vicinity}</p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="rating-badge">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            {hotel.rating || "N/A"}
                        </span>
                        <a
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}&query_place_id=${hotel.place_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-geo-alt-fill"></i> Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
