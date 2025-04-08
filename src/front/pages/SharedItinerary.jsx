import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaMapMarkerAlt, FaCalendarAlt, FaSuitcase } from "react-icons/fa";

const SharedItinerary = () => {
  const { user_id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  const userName = localStorage.getItem('user_name');
  if (!userName) {

    console.log('User name not found in localStorage.');
  } else {
    console.log('User Name:', userName);
  }


  useEffect(() => {
    const fetchItinerary = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}shared/itinerary/${user_id}`);
      const data = await res.json();
      setItinerary(data);
    };
    fetchItinerary();
  }, [user_id]);

  if (!itinerary) return <p>Loading shared itinerary...</p>;

  return (
   <div className="row row-cols-1 row-cols-md-2 g-4" style={{width:"60%"}}>
      {itinerary.map(item => (
        <div key={item.id}>
          <h1>{userName}</h1>
          <div className="align-items-center">
            <div className="itineraryCard">
              <div className="d-flex justify-contentent-between">
                <p className="fw-bold text-info p-2 text-muted btn-outline">
                  {(() => {
                    const today = new Date();
                    const start = new Date(item.start_date);
                    const diffTime = start.getTime() - today.getTime();
                    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return daysLeft > 0
                      ? `${daysLeft} day(s) left until your trip! ✈️`
                      : `You're on your trip or it already passed! 🌴`;
                  })()}
                </p>

              </div>
              <div className="myItineraryText" >
                <h5 className="card-title fs-3  ">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  {item.location}
                </h5>
                <p className=" card-text mb-2 p-1">
                  <FaCalendarAlt className="me-3 text-secondary " />
                  <strong>{item.start_date}</strong> to <strong>{item.end_date}</strong>
                </p>
              </div>
            </div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default SharedItinerary;
