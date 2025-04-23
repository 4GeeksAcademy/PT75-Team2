import React, { useState, useEffect } from "react";
import { AttractionCard } from "../components/AttractionCard";
import { useLocation } from "react-router-dom";

// Helper to group cards
const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

export const Attractions = () => {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const handleSearch = async (customQuery = query) => {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}attractions?destination=${encodeURIComponent(customQuery)}`
        );
        const data = await response.json();
        setResults(data.results || []);
    };


    // Separate into restaurants and activities
    const restaurants = results.filter(place =>
        place.types && place.types.some(type => type.toLowerCase().includes("restaurant"))
    );
    const activities = results.filter(place =>
        !place.types?.includes("restaurant")
    );

    const chunkedRestaurants = chunkArray(restaurants, 3);
    const chunkedActivities = chunkArray(activities, 3);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const destination = params.get("destination");
        if (destination) {
            setQuery(destination);
            handleSearch(destination);
        }
    }, [location]);


    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    const ids = data.map((item) => item.place_id);
                    setWishlist(ids);
                }
            } catch (err) {
                console.error("Error loading wishlist", err);
            }
        };

        fetchWishlist();
    }, []);


    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Discover Attractions</h2>

            <div className="d-flex justify-content-center mb-4">
                <div className="input-group w-100" style={{ maxWidth: "600px" }}>
                    <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-geo-alt-fill text-primary"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0 border-end-0"
                        placeholder="Search for cities to explore..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button className="btn btn-primary" onClick={() => handleSearch()}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
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
                                            <AttractionCard
                                                key={`rest-${i}`}
                                                place={place}
                                                isWishlisted={wishlist.includes(place.place_id)}
                                                onToggleWishlist={(place) => {
                                                    setWishlist((prev) =>
                                                        prev.includes(place.place_id)
                                                            ? prev.filter((id) => id !== place.place_id)
                                                            : [...prev, place.place_id]
                                                    );
                                                }}
                                            />
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
                                            <AttractionCard
                                                key={`act-${i}`}
                                                place={place}
                                                isWishlisted={wishlist.includes(place.place_id)}
                                                onToggleWishlist={(place) => {
                                                    setWishlist((prev) =>
                                                        prev.includes(place.place_id)
                                                            ? prev.filter((id) => id !== place.place_id)
                                                            : [...prev, place.place_id]
                                                    );
                                                }}
                                            />
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
