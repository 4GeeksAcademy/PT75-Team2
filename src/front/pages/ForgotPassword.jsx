import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tripSyncLogo from "../assets/img/TripSync-logo.png";

export const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}verify-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email })
            });

            const data = await response.json();

            if (response.ok) {
                setStep(2);
                setError(null);
            } else {
                setError(data.error || "Name and email do not match any user.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, new_password: newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/login");
            } else {
                setError(data.error || "Failed to reset password.");
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
                <h2 className="text-center mb-4">Reset Password</h2>

                {error && (
                    <div className="alert alert-danger py-2" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={step === 1 ? handleVerify : handleReset}>
                    {step === 1 ? (
                        <>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
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
                            <button type="submit" className="btn btn-primary w-100">
                                Verify Identity
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">
                                Reset Password
                            </button>
                        </>
                    )}
                </form>

                <p className="mt-3 text-center">
                    <Link to="/login" className="text-primary">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};
