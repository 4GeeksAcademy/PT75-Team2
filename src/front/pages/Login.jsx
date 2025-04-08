import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        

        const data = await response.json();
        if (data) {
            const user_id = data.user.id;
            localStorage.setItem('user_id', user_id)};
        // console.log("Login response:", user_id)};

        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem("token", data.token);
            dispatch({ type: "set_user", payload: data.user }); // Set user globally
            alert("Login successful! Redirecting to dashboard...");
            navigate("/home"); // Redirect to Dashboard
        } else {
            setError(data.error || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

