import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const [user, setUser] = useState(null); // Store user details
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login"); // Redirect if no token
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}protected`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();
                console.log("API Response in Dashboard:", data); // ✅ Log response

                if (response.ok) {
                    setUser(data.user);  // ✅ Check if this is actually setting the state
                } else {
                    alert("Session expired. Please log in again.");
                    handleLogout();
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
                handleLogout();
            }
        };

        fetchUserData();
    }, [navigate]);

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT
        navigate("/login"); // Redirect to Login
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Dashboard</h1>

            {user ? (
                <div className="card p-4 shadow-lg mt-4">
                    <h3>Welcome, {user.name}!</h3>
                    <p>Email: {user.email}</p>

                    <div className="d-flex flex-column mt-4">
                        <button
                            className="btn btn-primary mb-2"
                            onClick={() => navigate("/itinerary")}
                        >
                            View Itinerary
                        </button>

                        <button
                            className="btn btn-secondary mb-2"
                            onClick={() => navigate("/profile")}
                        >
                            Edit Profile
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-4">Loading user data...</p>
            )}
        </div>
    );
};

