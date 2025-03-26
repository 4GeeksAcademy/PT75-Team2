import React, { useEffect, useState } from "react";

const Itinerary = () => {
    const [itinerary, setItinerary] = useState()
    const token = localStorage.getItem("token");

    const removeFromItinerary = (id) => {
        setItinerary(itinerary.filter((item) => item.id !== id));
    };

    const fetchItinerary = async () => {
        try {
            const response = await fetch('https://miniature-invention-r4pp9wq9p46rh5x7q-3001.app.github.dev/itinerary', {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()
            setItinerary(data)
            console.log("Here is your data", data)


        } catch (err) { "Error adding to itinerary", err }

    }
    useEffect(() => { fetchItinerary(); }, [])

    return (
        <div>
            <h1>My Itinerary</h1>
            {itinerary != null ? (
                itinerary.map((item) => (
                    <div key={item.id} className="itineraryItem">
                        <h3>{item.name}</h3>
                        <p>Location: {item.location}</p>
                        <p>Hotel: {item.hotel}</p>
                        <button onClick={() => removeFromItinerary(item.id)}>Remove</button>
                        <div><p>Attractions:{item.attraction}</p>
                        <button onClick={() => removeFromItinerary(item.id)}>Remove</button>
                        </div>
                    </div>
                    
                ))
            ) : <p>No items added to itinerary yet.</p>}
        </div>
    );
};

export default Itinerary;
