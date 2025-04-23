import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/img/Default-avatar.jpg"; // Optional: use a default avatar from assets
import { useClickOutside } from "../hooks/useClickOutside";
import "../css/AccountDropdown.css";


export default function AccountDropdown({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown when clicking outside
    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div className="position-relative w-100" ref={dropdownRef}>
            <img
                src={user?.avatar || defaultAvatar}
                alt="profile"
                className="rounded-circle border border-light shadow-sm account-avatar"
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div
                    className="position-absolute end-0 mt-2 bg-white rounded shadow-sm border account-dropdown"
                >
                    <div className="px-3 py-3 border-bottom">
                        <p className="mb-0 fw-semibold">{user?.name}</p>
                        <p className="mb-0 text-muted small">{user?.email}</p>
                    </div>
                    <ul className="list-unstyled mb-0">
                        <li>
                            <Link to="/accountSettings" className="dropdown-item py-1">
                                <i className="bi bi-person px-3" /> Account Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/home" className="dropdown-item py-1">
                                <i className="bi bi-heart px-3" /> Wishlist
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={onLogout}
                                className="dropdown-item text-danger py-1 w-100 text-start"
                            >
                                <i className="bi bi-box-arrow-right px-3" /> Log out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

