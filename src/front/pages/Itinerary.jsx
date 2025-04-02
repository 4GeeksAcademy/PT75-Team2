import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaMapMarkerAlt, FaCalendarAlt, FaSuitcase } from "react-icons/fa";
import { Attractions } from "./Attractions";
// import 'src/front/components/itinerary.css'

const Itinerary = () => {
    const [itinerary, setItinerary] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editLocation, setEditLocation] = useState("");
    const [editStart, setEditStart] = useState("");
    const [editEnd, setEditEnd] = useState("");


    const userId = localStorage.getItem("user_id");
    const shareableLink = `${window.location.origin}/sharedItinerary/${userId}`;



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

    const startEditing = (item) => {
        setEditingId(item.id);
        setEditLocation(item.location);
        setEditStart(item.start_date);
        setEditEnd(item.end_date);
    };

    const saveEdit = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    location: editLocation,
                    start_date: editStart,
                    end_date: editEnd,
                }),
            });

            if (!res.ok) throw new Error("Failed to update");

            fetchItinerary();
            setEditingId(null);
        } catch (err) {
            console.error("Error updating itinerary:", err);
        }
    };

    useEffect(() => {
        fetchItinerary();
    }, []);

    return (
        <div className="container py-5">
            <div className="itineraryJumbotron bg-light p-5 rounded-3 shadow-sm text-center mb-4">
                <h1 className="fw-bold display-5">
                    <FaSuitcase className="me-2 text-dark" /> My Travel Itinerary
                </h1>
                <p className="lead text-muted">Plan, update, and manage your travel stops with ease.</p>
            </div>

            {itinerary.length ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {itinerary.map((item) => (
                        <div key={item.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    {editingId === item.id ? (
                                        <>
                                            <input
                                                className="form-control mb-2"
                                                value={editLocation}
                                                onChange={(e) => setEditLocation(e.target.value)}
                                                placeholder="Location"
                                            />
                                            <input
                                                className="form-control mb-2"
                                                type="date"
                                                value={editStart}
                                                onChange={(e) => setEditStart(e.target.value)}
                                            />
                                            <input
                                                className="form-control mb-2"
                                                type="date"
                                                value={editEnd}
                                                onChange={(e) => setEditEnd(e.target.value)}
                                            />
                                            <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(item.id)}>
                                                Save
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h5 className="card-title border-dark">
                                                <FaMapMarkerAlt className="me-2 text-primary" />
                                                {item.location}
                                            </h5>
                                            <p className="card-text mb-2">
                                                <FaCalendarAlt className="me-2 text-secondary" />
                                                <strong>{item.start_date}</strong> to <strong>{item.end_date}</strong>
                                            </p>
                                            <div className="itineraryButtons float-end">
                                            <button
                                                className="btn btn-outline-primary btn-sm me-2"
                                                onClick={() => startEditing(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => removeFromItinerary(item.id)}
                                            >
                                                <FaTrashAlt className="me-1" /> Remove
                                            </button>
                                            </div>
                                            <div className="sharedItinerary text-center mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control d-inline-block w-auto float-start"
                                                    value={shareableLink}
                                                    readOnly
                                                    onClick={(e) => e.target.select()}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5">
                    <p className="lead">No items added to your itinerary yet.</p>
                </div>
            )}
        </div>
    );
};

export default Itinerary;