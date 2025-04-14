import React from "react";

const WishlistCard = ({ item, onRemove, onAddToItinerary, apiKey }) => {
    return (
        <div
            className="card shadow-sm position-relative"
            style={{
                width: "290px",
                minWidth: "270px",
                borderRadius: "12px",
                overflow: "hidden"
            }}
        >
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

            <div className="card- p-3">
                <h6 className="card-title">{item.name}</h6>
                <p className="text-muted small">{item.address}</p>
            </div>
        </div>
    );
};

export default WishlistCard;
