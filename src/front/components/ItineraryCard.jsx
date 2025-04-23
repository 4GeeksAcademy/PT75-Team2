// src/components/ItineraryPreviewCard.jsx
import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrashAlt } from "react-icons/fa";

const ItineraryCard = ({ item, onDelete }) => {
  const daysLeftText = (() => {
    const today = new Date();
    const start = new Date(item.start_date);
    const diffTime = start.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysLeft > 0
      ? `${daysLeft} day(s) left ✈️`
      : `Trip in progress or passed 🌴`;
  })();

  return (
    <div className="card shadow-sm rounded-4 border-0 mb-4" style={{ width: "18rem" }}>
      <img
        src={item.location_image_url}
        className="card-img-top"
        alt={item.location}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => (e.target.src = "/fallback.jpg")}
      />
      <div className="card-body text-center">
        <h6 className="card-title mb-2">
          <FaMapMarkerAlt className="me-2 text-primary" />
          {item.location}
        </h6>
        <p className="card-text text-muted small mb-1">
          <FaCalendarAlt className="me-2 text-secondary" />
          <strong>{item.start_date}</strong> to <strong>{item.end_date}</strong>
        </p>
        <p className="text-muted small">{daysLeftText}</p>
        <button
          className="btn btn-sm btn-outline-danger mt-2"
          onClick={() => onDelete(item.id)}
        >
          <FaTrashAlt className="me-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;
