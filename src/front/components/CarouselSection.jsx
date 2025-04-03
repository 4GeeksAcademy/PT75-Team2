import React from "react";
import { Link } from "react-router-dom";

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
                                    <Link
                                        key={i}
                                        to={`/attractions?destination=${encodeURIComponent(place.name)}`}
                                        className="position-relative card shadow-sm text-decoration-none text-white"
                                        style={{
                                            width: "270px",
                                            height: "320px",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            transition: "transform 0.2s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        <img
                                            src={place.photo_url}
                                            alt={place.name}
                                            className="w-100 h-100"
                                            style={{ objectFit: "cover" }}
                                            onError={(e) => (e.target.src = "/placeholder.jpg")}
                                        />
                                        <div
                                            className="position-absolute bottom-0 w-100 text-center"
                                            style={{
                                                background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                                                padding: "0.75rem",
                                            }}
                                        >
                                            <h6 className="mb-0 text-white fw-semibold">{place.name}</h6>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel buttons */}
                <button
                    className="carousel-control-prev d-flex align-items-center justify-content-center"
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>

                <button
                    className="carousel-control-next d-flex align-items-center justify-content-center"
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
};
