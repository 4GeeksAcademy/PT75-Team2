import React, { useState, useEffect } from "react";
import { HotelCard } from "../components/HotelCard";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";


export const Hotels = () => {
    const [destination, setDestination] = useState("");
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const calendarRef = useRef();
    useClickOutside(calendarRef, () => setOpenCalendar(false));

    const [openCalendar, setOpenCalendar] = useState(false);

    // To format the displayed text
    const formattedStart = format(dateRange[0].startDate, 'MMM dd, yyyy');
    const formattedEnd = format(dateRange[0].endDate, 'MMM dd, yyyy');

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
            localStorage.setItem("start_date", format(dateRange[0].startDate, 'yyyy-MM-dd'));
            localStorage.setItem("end_date", format(dateRange[0].endDate, 'yyyy-MM-dd'));


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
            {/* 🔹 HERO SECTION */}
            <div className="hero-section d-flex align-items-center justify-content-center text-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="container bg-white bg-opacity-75 p-4 rounded shadow" style={{ maxWidth: '900px' }}>
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
                            <div className="col-md-4 position-relative">
                                <button
                                    type="button"
                                    className="form-control text-start"
                                    onClick={() => setOpenCalendar(!openCalendar)}
                                >
                                    <i className="bi bi-calendar me-2"></i>
                                    {formattedStart} - {formattedEnd}
                                </button>

                                {openCalendar && (
                                    <div
                                        ref={calendarRef}
                                        className="position-absolute z-3 mt-2 rounded"
                                        style={{
                                            background: "white",
                                            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                                            borderRadius: "0.5rem"
                                        }}
                                    >
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDateRange([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={dateRange}
                                            rangeColors={["#0d6efd"]}
                                        />
                                        <div className="text-end px-3 pb-2">
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => setOpenCalendar(false)}>
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                )}
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

            {/* 🔹 RESULTS SECTION */}
            <div className="container py-5">
                {hotels.length > 0 ? (
                    <>
                        <h3 className="text-center mb-4">Search Results</h3>
                        <div className="d-flex flex-wrap justify-content-center gap-4">
                            {hotels.map((hotel, i) => (
                                <HotelCard
                                    key={i}
                                    hotel={hotel}
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
                    </>
                ) : (
                    !loading && (
                        <div className="text-center text-muted mt-5">
                            <p>No hotels to show. Start by searching a destination.</p>
                        </div>
                    )
                )}
            </div>
        </>
    );

};
