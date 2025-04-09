import React from "react";
import { useTripSyncContext } from "../../contextapi";

export const AttractionCard = ({ place, isWishlisted, onToggleWishlist }) => {
    const {handleAddToWishlist, handleAddToItinerary} = useTripSyncContext();

    const {
        name,
        photo_url,
        rating,
        price_level,
        formatted_address,
        place_id,
    } = place;

    // const handleAddToWishlist = async () => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         alert("Please log in to save favorites.");
    //         return;
    //     }

    //     try {
    //         const method = isWishlisted ? "DELETE" : "POST";
    //         const endpoint = isWishlisted
    //             ? `${import.meta.env.VITE_BACKEND_URL}wishlist/${place_id}`
    //             : `${import.meta.env.VITE_BACKEND_URL}wishlist`;

    //         const payload = isWishlisted
    //             ? null
    //             : JSON.stringify({
    //                 place_id,
    //                 name,
    //                 address: formatted_address,
    //                 rating,
    //                 photo_reference: place.photos?.[0]?.photo_reference || "",
    //             });

    //         await fetch(endpoint, {
    //             method,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             ...(payload && { body: payload }),
    //         });

    //         onToggleWishlist(place);
    //     } catch (err) {
    //         console.error("Wishlist error:", err);
    //         alert("Error updating wishlist.");
    //     }
    // };

    return (
        <div
            className="card shadow-sm position-relative border-0"
            style={{
                width: "270px",
                minWidth: "270px",
                borderRadius: "1rem",
                transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <div className="position-relative">
                <img
                    src={photo_url}
                    alt={name}
                    className="card-img-top"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                    style={{
                        height: "240px",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />

                <button
                    className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-circle shadow-sm"
                    onClick={()=>{handleAddToWishlist(place); onToggleWishlist(place)}}
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
            </div>

            <div className="card-body px-3 pt-3 pb-2">
                <h6 className="card-title mb-1">{name}</h6>
                <p className="text-muted small mb-2">{formatted_address}</p>

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
                    className="btn btn-sm btn-primary w-100 mt-2"
                    
                    onClick={()=>{handleAddToItinerary(place)}}
                >
                    <i className="bi bi-suitcase2-fill me-1" ></i> Add to Itinerary
                </button>
            </div>

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
    );
};
