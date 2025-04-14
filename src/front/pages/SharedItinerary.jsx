import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";


const SharedItinerary = () => {
  const { user_id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [userName, setUserName] = useState("Traveler")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${user_id}`);
        if (!res.ok) throw new Error("User fetch failed");
        const data = await res.json();
        console.log("here is your data", data);
        setUserName(data.username);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [user_id]);


  useEffect(() => {
    const fetchItinerary = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}shared/itinerary/${user_id}`);
      const data = await res.json();
      setItinerary(data.itinerary);
      console.log("Here is your data.itinerary: ", data.itinerary)
    };
    fetchItinerary();
  }, [user_id]);

  if (!itinerary) return <p>Loading shared itinerary...</p>;

  return (
    <div className="container">
      <h1 className="itineraryUserName d-flex justify-content-center m-5 " style={{ fontFamily: "initial", backgroundColor: "Highlight" }}> {userName}'s Itinerary</h1>
      <div className="row justify-content-center g-4">
        {itinerary.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-60 border-0 rounded-4 overflow-hidden">
              <img
                src="https://th.bing.com/th/id/OIP.IM4Q91XVa6w8XjvgLwvtkwHaE7?rs=1&pid=ImgDetMain"
                className="card-img-top"
                alt="Destination"

              />
              <div className="card-body d-flex flex-column justify-content-between p-5">
                <p className="text-muted small mb-2">
                  {(() => {
                    const today = new Date();
                    const start = new Date(item.start_date);
                    const diffTime = start.getTime() - today.getTime();
                    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return daysLeft > 0
                      ? `${daysLeft} day(s) left until your trip! ✈️`
                      : `${userName} is already on this trip or it already passed! 🌴`;
                  })()}
                </p>

                <h5 className="card-title">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  {item.location}
                </h5>

                <p className="card-text mb-0">
                  <FaCalendarAlt className="me-2 text-secondary" />
                  <strong>{item.start_date}</strong> to <strong>{item.end_date}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedItinerary;
