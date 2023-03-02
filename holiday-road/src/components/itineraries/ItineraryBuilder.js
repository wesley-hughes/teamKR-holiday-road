import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./Provider";

export const ItineraryBuilder = () => {
  const {
    getParks,
    parks,
    getBizs,
    bizs,
    getEateries,
    eateries,
    getEateryById,
    getBizById,
    getParkById,
    saveNewItinerary,
    getItineraries,
    itineraries,
  } = useContext(TripContext);
  const navigate = useNavigate();
  const [selectPark , setSelectPark] = useState({})
  const [biz , setBiz] = useState({})
  const [eatery , setEatery] = useState({})
  const [itinerary, setItinerary] = useState(
    {
    parkId: "",
    bizId: "",
    eateryId: "",
    userId: "",
  });
const parkDialog = useRef()
const bizDialog = useRef()
const eateryDialog = useRef()

const [modal, setModal] = useState(false)

  useEffect(() => {
    getParks().then(getBizs()).then(getEateries());
  }, []);

  const whichDetailClicked = (e) => {
    const detailClicked = e.target.value
    if (detailClicked === "parkDetails") {
      setModal(true)
      parkDialog.current.showModal()
    } else if (detailClicked === "bizDetails") {
        setModal(true)
        bizDialog.current.showModal()
      } else if (detailClicked === "eateryDetails") {
        setModal(true)
        eateryDialog.current.showModal()
      }
  }

  useEffect(() => {
    getParkById(itinerary.parkId)
    .then(newPark => setSelectPark(newPark.data[0]))
    .then(getBizById(itinerary.bizId)
    .then(thisBiz => setBiz(thisBiz)))
    .then(getEateryById(itinerary.eateryId)
    .then(thisEatery => setEatery(thisEatery)))
  },[itinerary])

  const handleInputItinerary = (event) => {
    const newItinerary = { ...itinerary };
    newItinerary[event.target.id] = event.target.value;
    setItinerary(newItinerary)
  };

  if (parks === 0) {
    return null;
  }
  return (
    <>
      <h2>List of Parks</h2>
      <select id="parkId" onChange={(event) => {
        handleInputItinerary(event)
         }}>      
        <option value="0">Choose Park</option>
        {parks.map((park) => (
          <option key={`park--${park.id}`} value={`${park.id}`}>
            {park.fullName}
          </option>
        ))}
      </select>

      <h2>List of Bizarreries</h2>
      <select id="bizId" onChange={handleInputItinerary}>
        <option value="0">Choose Bizarrerie</option>
        {bizs.map((biz) => (
          <option key={`biz--${biz.id}`} value={`${biz.id}`}>
            {biz.name}
          </option>
        ))}
      </select>

      <h2>List of Eateries</h2>
      <select id="eateryId" onChange={handleInputItinerary}>
        <option value="0">Choose Eatery</option>
        {eateries.map((eatery) => (
          <option key={`eatery--${eatery.id}`} value={`${eatery.id}`}>
            {eatery.businessName}
          </option>
        ))}
      </select>

      <h2>Itinerary Preview</h2>
      <div>
        Park: {selectPark.fullName} <button type="button" value="parkDetails"
        onClick={(e) => {
        whichDetailClicked(e)
        }}
        >Details</button>
        Bizarrerie: {biz.name} <button type="button" value="bizDetails"
        onClick={(e) =>
          whichDetailClicked(e)
           }
         >Details</button>
        Eatery: {eatery.businessName} <button type="button" value="eateryDetails" 
        onClick={(e) =>
          whichDetailClicked(e)
           }>Details</button>
      </div>
      <button
        type="button"
        onClick={(event) => {
          saveNewItinerary(itinerary);
        }}
      >
        Save Itinerary
      </button>
      <dialog ref={parkDialog}>
        <div>{selectPark.description}</div>
        <button className="button--close"
        onClick={(e) => {
          parkDialog.current.close()
        setModal(false)}}>Close</button>
      </dialog>
      <dialog ref={bizDialog}>
        <div>{biz.description}</div>
        <button className="button--close"
        onClick={(e) => {
          bizDialog.current.close()
          setModal(false)}}>Close</button>
      </dialog>
      <dialog ref={eateryDialog}>
        <div>{eatery.description}</div>
        <button className="button--close"
        onClick={(e) => {
        eateryDialog.current.close()
        setModal(false)
        }}>Close</button>
      </dialog>
    </>
  );
};
