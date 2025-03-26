import React, { useState, useEffect } from "react";

const Itinerary = () => {
    const [itinerary, setItinerary] = useState([]);

    const fetchItinerary = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setItinerary(data);
        } catch (err) {
            console.error("Error loading itinerary:", err);
        }
    };

    const removeFromItinerary = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItinerary((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    useEffect(() => {
        fetchItinerary();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="mb-4">My Itinerary</h1>
            {itinerary.length ? (
                itinerary.map((item) => (
                    <div key={item.id} className="border p-3 rounded shadow-sm mb-3">
                        <h5>{item.location}</h5>
                        <p>
                            From: <strong>{item.start_date}</strong> to{" "}
                            <strong>{item.end_date}</strong>
                        </p>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeFromItinerary(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                    
                ))
            ) : (
                <p>No items added to itinerary yet.</p>
            )}
        </div>
    );
};

export default Itinerary;
