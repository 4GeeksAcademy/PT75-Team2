import React, {useState} from "react";


const Itinerary = () => {
    const [itinerary , setItinerary] = useState()

    const removeFromItinerary = (id) => {
        setItinerary(itinerary.filter((item) => item.id !== id));
    };

    return (
        <div>
            <h1>My Itinerary</h1>
            {itinerary != null ? (
                itinerary.map((item) => (
                    <div key={item.id} className="itineraryItem">
                        <h3>{item.name}</h3>
                        <p>Location: {item.location}</p>
                        <p>Hotel: {item.hotel}</p>
                        <p>Attractions:{item.attraction}</p>
                        <button onClick={() => removeFromItinerary(item.id)}>Remove</button>
                    </div>
                ))
            ) : <p>No items added to itinerary yet.</p>}
        </div>
    );
};

export default Itinerary;
