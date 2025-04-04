// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Provide the store and dispatch method to all child components.
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);

    const loadUserFromToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                dispatch({ type: "set_user", payload: user });
            } else {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Failed to load user:", error);
            localStorage.removeItem("token");
        }
    };

    return { dispatch, store, loadUserFromToken };
}