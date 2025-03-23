import React, { useState, useEffect } from "react";
import { HotelCard } from "../components/HotelCard";
import "../HotelCard.css";

export const Hotels = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState({});



    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}hotels?destination=${encodeURIComponent(destination)}`);
            const baseHotels = await res.json();

            if (!res.ok) {
                alert(baseHotels.error || "Failed to fetch hotels");
                setLoading(false);
                return;
            }

            // For each hotel, fetch Place Details and merge
            const enrichedHotels = await Promise.all(
                baseHotels.map(async (hotel) => {
                    const details = await fetchPlaceDetails(hotel.place_id);
                    return { ...hotel, ...details };
                })
            );

            setHotels(enrichedHotels);
        } catch (error) {
            console.error("Hotel search error:", error);
            alert("Something went wrong while searching for hotels.");
        }

        setLoading(false);
    };


    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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

    const changePhoto = (placeId, direction) => {
        setCurrentPhoto(prev => {
            const current = prev[placeId] || 0;
            const hotel = hotels.find(h => h.place_id === placeId);
            const length = hotel?.photos?.length || 1;
            const newIndex = (current + direction + length) % length;
            return { ...prev, [placeId]: newIndex };
        });
    };


    const handleAddToWishlist = (hotel) => {
        setWishlist(prev =>
            prev.includes(hotel.place_id)
                ? prev.filter(id => id !== hotel.place_id)
                : [...prev, hotel.place_id]
        );
    };

    const fetchPlaceDetails = async (placeId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}place-details/${placeId}`);
            if (!res.ok) {
                console.error("Failed to fetch details for", placeId);
                return {};
            }
            const details = await res.json();
            return details;
        } catch (err) {
            console.error("Error fetching place details:", err);
            return {};
        }
    };



    return (
        <>
            <div className="hero-section d-flex align-items-center justify-content-center text-center">
                <div className="container bg-white bg-opacity-50 p-4 rounded shadow-lg" style={{ maxWidth: '900px' }}>
                    <h2 className="fw-bold mb-4">Find Your Perfect Stay</h2>
                    <form onSubmit={handleSearch}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-primary w-100">
                                    {loading ? "Searching..." : "Search Hotels"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container py-5">
                <div className="row">
                    {hotels.map((hotel, i) => (
                        <HotelCard
                            key={i}
                            hotel={hotel}
                            currentPhoto={currentPhoto}
                            onChangePhoto={changePhoto}
                            isWishlisted={wishlist.includes(hotel.place_id)}
                            onToggleWishlist={(hotel) => {
                                setWishlist((prev) =>
                                    prev.includes(hotel.place_id)
                                        ? prev.filter((id) => id !== hotel.place_id)
                                        : [...prev, hotel.place_id]
                                );
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
