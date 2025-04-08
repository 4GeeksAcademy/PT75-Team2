import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaMapMarkerAlt, FaCalendarAlt, FaSuitcase } from "react-icons/fa";
import { Attractions } from "./Attractions";
import { Hotels } from "./Hotels"
// import 'src/front/components/itinerary.css'

const Itinerary = () => {
    const [itinerary, setItinerary] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editLocation, setEditLocation] = useState("");
    const [editStart, setEditStart] = useState("");
    const [editEnd, setEditEnd] = useState("");


    const userId = localStorage.getItem('user_id');
    if (!userId) {

        console.log('User ID not found in localStorage.');
    } else {
        console.log('User ID:', userId);
    }

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
                <div className="text-center mb-4 pb-5 float-end">
                    <button
                        className="btn btn-primary text-blue"
                        onClick={() => {
                            navigator.clipboard.writeText(shareableLink);
                            alert("Link copied to clipboard!");
                        }}
                    >
                        Share Your Itinerary
                    </button>
                </div>
            </div>

            {itinerary.length ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {itinerary.map((item) => (
                        <div key={item.id} className="col">
                            <div className="mb-4">
                                <div className=" card-body p-0 mb-5" >
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
                                        <div className="align-items-center">
                                            <div className="itineraryCard">
                                                <div className="d-flex justify-contentent-between">
                                                    <p className="fw-bold text-info p-2 text-muted btn-outline">
                                                        {(() => {
                                                            const today = new Date();
                                                            const start = new Date(item.start_date);
                                                            const diffTime = start.getTime() - today.getTime();
                                                            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                            return daysLeft > 0
                                                                ? `${daysLeft} day(s) left until your trip! ✈️`
                                                                : `You're on your trip or it already passed! 🌴`;
                                                        })()}
                                                    </p>

                                                </div>
                                                <div className="itineraryButtons d-flex align-items-center float-end ">
                                                    <button
                                                        className="btn btn-sm  pe-3"
                                                        onClick={() => startEditing(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm "
                                                        onClick={() => removeFromItinerary(item.id)}
                                                    >
                                                        <FaTrashAlt className="me-1" />

                                                    </button>
                                                </div>
                                                <div className="myItineraryText" >
                                                    <h5 className="card-title fs-3  ">
                                                        <FaMapMarkerAlt className="me-2 text-primary" />
                                                        {item.location}
                                                    </h5>
                                                    <p className=" card-text mb-2 p-1">
                                                        <FaCalendarAlt className="me-3 text-secondary " />
                                                        <strong>{item.start_date}</strong> to <strong>{item.end_date}</strong>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
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