// src/front/hooks/useAuthGuard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./tokenUtils";
import useGlobalReducer from "./useGlobalReducer";

export default function useAuthGuard() {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            dispatch({ type: "logout" });
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, []);
}
