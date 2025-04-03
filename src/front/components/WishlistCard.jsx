import React from "react";

const WishlistCard = ({ item, onRemove, apiKey }) => {
    return (
        <div
            className="card shadow-sm position-relative"
            style={{
                width: "270px",
                minWidth: "270px",
                borderRadius: "12px",
                overflow: "hidden"
            }}
        >
            <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${apiKey}`}
                className="card-img-top"
                style={{
                    height: "300px", width: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                }}
                alt={item.name}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
            />

            <button
                className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-circle shadow-sm"
                onClick={() => onRemove(item.place_id)}
                title="Remove from wishlist"
                style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <i className="bi bi-heart-fill text-danger"></i>
            </button>

            <div className="card-body">
                <h6 className="card-title">{item.name}</h6>
                <p className="text-muted small">{item.address}</p>
            </div>
        </div>
    );
};

export default WishlistCard;
