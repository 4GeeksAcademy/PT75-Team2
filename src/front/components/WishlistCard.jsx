import React from "react";

const WishlistCard = ({ item, onRemove, onAddToItinerary, apiKey }) => {
    return (
        <div className="card h-100 shadow-sm position-relative rounded-3" style={{ minWidth: "250px", maxWidth: "100%" }}>
            <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${apiKey}`}
                className="card-img-top"
                alt={item.name}
                style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
            />

            {/* Remove from Wishlist */}
            <button
                className="btn btn-light position-absolute top-0 end-0 m-2 p-1 rounded-circle shadow-sm"
                onClick={() => onRemove(item.place_id)}
                title="Remove from wishlist"
                style={{
                    width: "34px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <i className="bi bi-heart-fill text-danger"></i>
            </button>

            <div className="card-body py-3 px-3 bg-white text-dark d-flex flex-column justify-content-between" style={{ height: "140px" }}>
                <div>
                    <h6 className="card-title mb-1 text-truncate" title={item.name}>{item.name}</h6>
                    <p className="card-text text-muted small mb-2 text-truncate" title={item.address}>{item.address}</p>
                    <button
                        className="btn btn-sm btn-outline-primary mt-auto w-100"
                        onClick={() => onAddToItinerary(item)}
                    >
                        Add to Itinerary
                    </button>
                </div>

            </div>
        </div>
    );
};

export default WishlistCard;
