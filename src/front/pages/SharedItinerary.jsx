import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SharedItinerary = () => {
  const { share_id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}shared/itinerary/${share_id}`);
      const data = await res.json();
      setItinerary(data);
    };
    fetchItinerary();
  }, [share_id]);

  if (!itinerary) return <p>Loading shared itinerary...</p>;

  return (
    <div>
      <h2>Shared Itinerary</h2>
      <p><strong>Location:</strong> {itinerary.location}</p>
      <p><strong>Start Date:</strong> {itinerary.start_date}</p>
      <p><strong>End Date:</strong> {itinerary.end_date}</p>
    </div>
  );
};

export default SharedItinerary;
