import React, { useState } from "react";
import { AttractionCard } from "../components/AttractionCard";

// Helper to group cards
const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

export const Attractions = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}attractions?destination=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data.results || []);
    };

    // Separate into restaurants and activities
    const restaurants = results.filter(place =>
        place.types && place.types.some(type => type.toLowerCase().includes("restaurant"))
    );
    console.log("Restaurants:", restaurants);
    const activities = results.filter(place =>
        !place.types?.includes("restaurant")
    );

    const chunkedRestaurants = chunkArray(restaurants, 3);
    const chunkedActivities = chunkArray(activities, 3);


    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Discover Attractions</h2>

            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a destination (e.g., Miami)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* === Restaurants Carousel === */}
            {chunkedRestaurants.length > 0 && (
                <>
                    <h3 className="text-start mb-3">Restaurants</h3>
                    <div id="restaurantCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {chunkedRestaurants.map((chunk, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                >
                                    <div className="d-flex justify-content-center gap-3">
                                        {chunk.map((place, i) => (
                                            <AttractionCard key={`rest-${i}`} place={place} />
                                        ))}
                                    </div>

                                </div>

                            ))}

                        </div>



                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#restaurantCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#restaurantCarousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </>
            )}

            {/* === Activities Carousel === */}
            {chunkedActivities.length > 0 && (
                <>
                    <h3 className="text-start mb-3">Activities</h3>
                    <div id="activityCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {chunkedActivities.map((chunk, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                >
                                    <div className="d-flex justify-content-center gap-3">
                                        {chunk.map((place, i) => (
                                            <AttractionCard key={`act-${i}`} place={place} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#activityCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#activityCarousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
