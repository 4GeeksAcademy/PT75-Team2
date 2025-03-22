import React from "react";

export const ImageSlider = ({ photos, currentIndex, onChange, placeId }) => {
    if (!photos || photos.length === 0) return null;

    const photo = photos[currentIndex] || photos[0];
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

    return (
        <div className="position-relative">
            <img
                src={photoUrl}
                className="card-img-top object-fit-cover"
                style={{ height: "200px", width: "100%", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                alt="Hotel"
            />
            {photos.length > 1 && (
                <>
                    <button className="carousel-arrow left" onClick={() => onChange(placeId, -1)}>
                        ⬅️
                    </button>
                    <button className="carousel-arrow right" onClick={() => onChange(placeId, 1)}>
                        ➡️
                    </button>
                </>
            )}

        </div>

    );
};
