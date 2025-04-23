import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaMapMarkerAlt, FaCalendarAlt, FaSuitcase } from "react-icons/fa";
import rigoPhoto from "../assets/img/rigo-baby.jpg";
import "../css/Itinerary.css";
import itineraryimage from "../assets/img/itineraryimage.jpg"
import useAuthGuard from "../hooks/useAuthGuard";

const Itinerary = () => {
  useAuthGuard();

  const [itinerary, setItinerary] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  const userId = localStorage.getItem('user_id');
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
    <div className=" py-5 itinerary-page" >
      <div className="itineraryJumbotron position-relative text-center text-white overflow-hidden rounded-3  mb-4">
        <img
          src={itineraryimage}
          alt="Itinerary Background"
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0
          }}
        />


        <div className="position-absolute w-100 h-100 itinerary-overlay"></div>
        <div className="position-relative p-5 itinerary-jumbotron-content">
          <h1 className="fw-bold display-5">
            <FaSuitcase className="me-2" /> My Travel Itinerary
          </h1>
          <p className="lead">
            Plan, update, and manage your travel stops with ease.
          </p>
          <button
            className="btn btn-light mt-3"
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
        <div className="d-flex flex-column align-items-center gap-4">
          {itinerary.map((item) => (
            <div key={item.id} className="itinerary-card-wrapper">
              <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">

                <img
                  src={item.location_image_url}
                  className="card-img-top itinerary-img"
                  alt={item.location}
                  onError={(e) => (e.target.src = rigoPhoto)}
                />


                <div className="card-body d-flex flex-column justify-content-between py-3">
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
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-success btn-sm" onClick={() => saveEdit(item.id)}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-muted small mb-3">
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



                      <h5>
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        {item.location}
                      </h5>

                      {item.note && (
                        <p className="itinerary-note">“{item.note}”</p>
                      )}

                      <p className="trip-card-date">
                        <FaCalendarAlt className="me-2 text-secondary" />
                        <strong>{item.start_date}</strong> to <strong>{item.end_date}</strong>
                      </p>



                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => startEditing(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromItinerary(item.id)}
                        >
                          <FaTrashAlt className="me-1" />
                        </button>
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