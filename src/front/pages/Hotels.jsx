import React, { useState, useEffect } from "react";
import { HotelCard } from "../components/HotelCard";

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
            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to fetch hotels");
                setLoading(false);
                return;
            }

            setHotels(data);
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


    return (
        <div className="container py-4">
            <h2 className="h4 fw-bold mb-4">Find Hotels</h2>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">
                        {loading ? "Searching..." : "Search Hotels"}
                    </button>
                </div>
            </form>

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
    );
};
