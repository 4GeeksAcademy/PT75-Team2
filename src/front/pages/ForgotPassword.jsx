import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tripSyncLogo from "../assets/img/TripSync-logo.png";

export const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStep(2);
                setError(null);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to send reset code.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}verify-reset-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            if (res.ok) {
                setStep(3);
                setError(null);
            } else {
                const data = await res.json();
                setError(data.error || "Invalid or expired code.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, new_password: newPassword }),
            });

            if (res.ok) {
                navigate("/login");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to reset password.");
            }
        } catch {
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

                {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

                <form onSubmit={
                    step === 1 ? handleSendEmail :
                        step === 2 ? handleVerifyCode :
                            handleResetPassword
                }>
                    {step === 1 && (
                        <>
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
                            <button type="submit" className="btn btn-primary w-100">Send Reset Code</button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="code" className="form-label">Verification Code</label>
                                <input
                                    id="code"
                                    type="text"
                                    className="form-control"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Verify Code</button>
                        </>
                    )}

                    {step === 3 && (
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
                            <button type="submit" className="btn btn-success w-100">Reset Password</button>
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
