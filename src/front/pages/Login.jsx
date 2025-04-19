import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import tripSyncLogo from "../assets/img/TripSync-logo.png";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user.id);
                localStorage.setItem("user_email", data.user.email);
                localStorage.setItem("user_name", data.user.name);
                localStorage.setItem("user_avatar", data.user.avatar || "");

                dispatch({ type: "set_user", payload: data.user });
                navigate("/home");
            } else {
                setError(data.error || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: "400px" }}>
                <div className="text-center mb-3">
                    <Link to="/" className="navbar-brand fs-3 text-primary fw-bold text-decoration-none">
                        <img src={tripSyncLogo} alt="tripSyncLogo" style={{ height: "90px", width: "auto", background: "dodgerblue" }} />
                    </Link>
                </div>
                <h2 className="text-center mb-4">Login</h2>

                {error && (
                    <div className="alert alert-danger py-2" role="alert">
                        {error}
                    </div>
                )}

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
                    <Link to="/forgotpassword" className="text-primary">Forgot password?</Link>
                </p>
                <p className="mt-3 text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-primary">Sign up</Link>
                </p>
            </div>
        </div>
    );
};