import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tripSyncLogo from "../assets/img/TripSync-logo.png";

export const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});

		const data = await response.json();
		console.log("Signup response:", data);

		if (response.ok) {
			navigate("/login");
		} else {
			alert(data.error || "Signup failed. Please try again.");
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
				<h2 className="text-center mb-4">Sign Up</h2>
				<form onSubmit={handleSignup}>
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
					<button type="submit" className="btn btn-primary w-100">
						Sign Up
					</button>
				</form>
				<p className="mt-3 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-primary">Login</Link>
				</p>
			</div>
		</div>
	);
};
