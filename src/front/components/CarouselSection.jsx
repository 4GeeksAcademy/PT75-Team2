import React from "react";

export const CarouselSection = ({ id, title, places }) => {
    if (!places || places.length === 0) return null;

    // Utility to chunk array into groups of 3
    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const chunked = chunkArray(places, 3);

    return (
        <div className="mb-5">
            <h3 className="mb-3">{title}</h3>
            <div id={id} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {chunked.map((group, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                            <div className="d-flex justify-content-center gap-3">
                                {group.map((place, i) => (
                                    <div
                                        key={i}
                                        className="card shadow-sm"
                                        style={{ width: "270px", borderRadius: "12px", overflow: "hidden" }}
                                    >
                                        <img
                                            src={place.photo_url}
                                            alt={place.name}
                                            className="card-img-top"
                                            style={{ height: "320px", objectFit: "cover" }}
                                            onError={(e) => (e.target.src = "/placeholder.jpg")}
                                        />
                                        <div className="card-body text-center">
                                            <h6 className="card-title">{place.name}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel controls */}
                <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    );
};
