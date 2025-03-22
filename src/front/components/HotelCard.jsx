import React from "react";
import { ImageSlider } from "./ImageSlider";

export const HotelCard = ({ hotel, currentPhoto, onChangePhoto, onToggleWishlist, isWishlisted }) => {
    const handleAddToWishlist = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to save favorites.");
            return;
        }

        try {
            if (isWishlisted) {
                // DELETE from wishlist
                await fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist/${hotel.place_id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                // POST to wishlist
                await fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        place_id: hotel.place_id,
                        name: hotel.name,
                        address: hotel.vicinity,
                        rating: hotel.rating,
                        photo_reference: hotel.photos?.[0]?.photo_reference || ""
                    })
                });
            }

            // Update UI
            onToggleWishlist(hotel);
        } catch (err) {
            console.error("Wishlist error:", err);
            alert("Something went wrong updating the wishlist.");
        }
    };
    
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm position-relative">
                <ImageSlider
                    photos={hotel.photos}
                    currentIndex={currentPhoto[hotel.place_id] || 0}
                    onChange={onChangePhoto}
                    placeId={hotel.place_id}
                />

                <button
                    className="wishlist-heart"
                    onClick={handleAddToWishlist}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <i className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                </button>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="card-text">{hotel.vicinity}</p>
                    <p className="card-text fw-bold mb-1">
                        Price: ${Math.floor(Math.random() * 200 + 80)} / night
                    </p>
                    {Math.random() > 0.6 && (
                        <span className="badge bg-success mb-2">Limited-time discount</span>
                    )}
                    <p className="card-text">⭐ {hotel.rating || "N/A"} / 5</p>
                </div>
            </div>
        </div>
    );
};
