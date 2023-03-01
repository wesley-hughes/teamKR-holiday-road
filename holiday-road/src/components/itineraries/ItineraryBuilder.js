import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./Provider";

export const ItineraryBuilder = () => {
  const { getParks, parks, getBizs, bizs, getEateries, eateries, getEateryById, getBizById, getParkById, saveNewItinerary, getItineraries, itineraries } = useContext(TripContext);
  const navigate = useNavigate();
  const [park , setPark] = useState({})
  const [biz , setBiz] = useState({})
  const [eatery , setEatery] = useState({})
  const [itinerary, setItinerary] = useState({
    parkId: "",
    bizId: "",
    eateryId: "",
    userId: ""
  });

  useEffect(() => {
    getParks()
    .then(getBizs())
    .then(getEateries())
  }, [])

  //firing on mount which is returning just first object, then fires again but should NOT have to click it twice to make it work

  useEffect(() => {
    if(itinerary.parkId === null){  }
      else{
    getParkById(itinerary.parkId)
    .then(park => setPark(park.data[0]))}
    console.log(park)
  },[itinerary])
  
  const handleInputItinerary = (event) => {
    const newItinerary = { ...itinerary };
    newItinerary[event.target.id] = event.target.value;
    setItinerary(newItinerary);
  };

  if (parks === 0) {
    return null;
  }
  return (
    <>
      <h2>List of Parks</h2>
      <select id="parkId" onChange={handleInputItinerary}>
        <option value="0">Choose Park</option>
        {parks.map((park) => (
          <option key={`park--${park.id}`} value={`${park.id}`} >
            {park.fullName}
          </option>
        ))}
      </select>

      <h2>List of Bizarraries</h2>
      <select id="bizId" onChange={handleInputItinerary}>
        <option value="0">Choose Bizarrary</option>
        {bizs.map((biz) => (
          <option key={`biz--${biz.id}`} value={`${biz.id}`} >
            {biz.name}
          </option>
        ))}
      </select>

      <h2>List of Eateries</h2>
      <select id="eateryId" onChange={handleInputItinerary}>
        <option value="0">Choose Eatery</option>
        {eateries.map((eatery) => (
          <option key={`eatery--${eatery.id}`} value={`${eatery.id}`} >
            {eatery.businessName}
          </option>
        ))}
      </select>
      

      <h2>Itinerary Preview</h2>
      <div>
        Park: {

        }
        Bizarrary: {}
        Eatery: {}
      </div>
      <button type="button" onClick={(event) => {saveNewItinerary(itinerary)}}>Save Itinerary</button>
      
    </>
  );
};
