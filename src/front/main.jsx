import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import './css/AboutUs.css';
import './css/AccountDropdown.css';
import './css/AttractionCard.css';
import './css/CarouselSection.css';
import './css/Footer.css';
import './css/HotelCard.css';
import './css/Itinerary.css';
import './css/Navbar.css';
import './css/SyncSpin.css';
import './css/WishlistCard.css';
import './css/Index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { StoreProvider } from './hooks/useGlobalReducer';
import useGlobalReducer from './hooks/useGlobalReducer';
import { BackendURL } from './components/BackendURL';
import { Tripsync } from '../contextapi';

const Main = () => {

    if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            <BackendURL />
        </React.StrictMode>
    );

    return (
        <Tripsync>
            <React.StrictMode>
                {/* Provide global state to all components */}
                <StoreProvider>
                    {/* Set up routing for the application */}
                    <RouterProvider router={router}>
                    </RouterProvider>
                </StoreProvider>
            </React.StrictMode>
        </Tripsync>
    );
};


// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
