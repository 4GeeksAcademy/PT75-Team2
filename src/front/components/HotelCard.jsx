import React from "react";

export const HotelCard = ({
    hotel,
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

    const handleAddToItinerary = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add to itinerary.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    location: hotel.vicinity || hotel.name,
                    start_date: localStorage.getItem("start_date"),
                    end_date: localStorage.getItem("end_date"),
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                alert(err.error || "Failed to add to itinerary");
                return;
            }

            alert("Added to itinerary!");
        } catch (err) {
            console.error("Itinerary error:", err);
            alert("Something went wrong.");
        }
    };


    const photoUrl =
        hotel?.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            : "/placeholder.jpg";


    return (
        <div
            className="card shadow-sm position-relative"
            style={{
                width: "270px",
                minWidth: "270px",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            <div className="position-relative">
                <img
                    src={photoUrl}
                    className="card-img-top"
                    alt={hotel.name}
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                    style={{
                        height: "240px",
                        objectFit: "cover",
                    }}
                />
                <button
                    className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-circle shadow-sm"
                    onClick={handleAddToWishlist}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    style={{
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <i
                        className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"}`}
                    ></i>
                </button>
                <button
                    className="btn btn-sm btn-success w-100 mt-2"
                    onClick={handleAddToItinerary}
                >
                    <i className="bi bi-suitcase2-fill me-1"></i> Add to Itinerary
                </button>
            </div>

            <div className="card-body px-3 pt-3 pb-2">
                <h6 className="card-title mb-1">{hotel.name}</h6>
                <p className="text-muted small mb-2">{hotel.vicinity}</p>

                <div className="d-flex justify-content-between align-items-center">
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
