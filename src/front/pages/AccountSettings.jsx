import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import useAuthGuard from "../hooks/useAuthGuard";

export const AccountSettings = () => {
    useAuthGuard();
    
    const { store, dispatch } = useGlobalReducer();
    const [name, setName] = useState(store.user?.name || "");
    const [email, setEmail] = useState(store.user?.email || "");
    const [message, setMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(store.user?.avatar || "/Default-avatar.jpg");


    useEffect(() => {
        if (store.user) {
            setName(store.user.name);
            setEmail(store.user.email);
        }
    }, [store.user]);

    const handlePasswordChange = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}account/password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
        } else {
            setMessage(data.error || "Failed to update password.");
        }
    };


    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}account`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage("Profile updated successfully!");
            dispatch({ type: "set_user", payload: data.user });
        } else {
            setMessage(data.error || "Failed to update profile.");
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // preview locally
    };

    const handleAvatarUpload = async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}account/avatar`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Avatar uploaded!");
            dispatch({ type: "set_user", payload: { ...store.user, avatar: data.avatar_url } });
        } else {
            setMessage(data.error || "Upload failed.");
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "600px" }}>
            <div className="bg-white p-4 shadow rounded-3">
                <h2 className="mb-4 text-primary">Account Settings</h2>

                {message && <div className="alert alert-info">{message}</div>}

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>

                <hr className="my-4" />
                <h5 className="mb-3 text-secondary">Change Password</h5>

                <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-warning" onClick={handlePasswordChange}>
                    Update Password
                </button>

                <hr className="my-4" />
                <h5 className="mb-3 text-secondary">Profile Picture</h5>

                <div className="mb-3 d-flex align-items-center gap-3">
                    <img
                        src={previewUrl}
                        alt="Avatar Preview"
                        className="rounded-circle border"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>

                <div className="d-flex justify-content-between flex-wrap gap-2">
                    <button
                        className="btn btn-warning"
                        onClick={handleAvatarUpload}
                        disabled={!avatarFile}
                    >
                        Upload Avatar
                    </button>

                    <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
