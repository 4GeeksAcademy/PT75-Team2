import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './newindex.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { StoreProvider } from './hooks/useGlobalReducer';
import useGlobalReducer from './hooks/useGlobalReducer';
import { BackendURL } from './components/BackendURL';

const AppLoader = () => {
    const { loadUserFromToken } = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            await loadUserFromToken();
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading user...</div>;

    return <RouterProvider router={router} />;
};

const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
        return (
            <React.StrictMode>
                <BackendURL />
            </React.StrictMode>
        );
    }

    return (
        <React.StrictMode>
            <StoreProvider>
                <AppLoader />
            </StoreProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
