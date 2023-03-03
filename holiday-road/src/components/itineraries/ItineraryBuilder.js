import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./Provider";
import { SavedItineraries } from "./SavedItineraries";

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
    forecast,
    getForecast
  } = useContext(TripContext);
  const navigate = useNavigate();
  const [selectPark , setSelectPark] = useState({})
  const [biz , setBiz] = useState({})
  const [eatery , setEatery] = useState({})
  const [filteredItin, setFilteredItin ] = useState([])
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

const holidayUserObj = JSON.parse(localStorage.getItem("holiday_user"))

  useEffect(() => {
    getParks().then(getBizs()).then(getEateries()).then(getItineraries());
  }, []);

  useEffect(() => {
    const myItin = itineraries.filter(itin => itin.userId === holidayUserObj.id)
    setFilteredItin(myItin)
},[itineraries])

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
    .then(thisPark => setSelectPark(thisPark))
    .then(getBizById(itinerary.bizId)
    .then(thisBiz => setBiz(thisBiz)))
    .then(getEateryById(itinerary.eateryId)
    .then(thisEatery => setEatery(thisEatery)))
  },[itinerary])

  // useEffect(() => {
  //   const lat = parseFloat(selectPark.latitude).toFixed(4)
  //   const long = parseFloat(selectPark.longitude).toFixed(4)
  //   getForecast(lat, long)
  // }, [selectPark])

  const handleInputItinerary = (event) => {
    const newItinerary = { ...itinerary };
    newItinerary[event.target.id] = event.target.value;
    // newItinerary[event.target.title] = event.target.name
    setItinerary(newItinerary)
  };

  const handleSaveItinerary = (event) => {

    const newItinerary = {
      parkId: itinerary.parkId,
      bizId: parseInt(itinerary.bizId),
      eateryId: parseInt(itinerary.eateryId),
      userId: holidayUserObj.id
    }
    saveNewItinerary(newItinerary)
    .then(() => navigate("/itinerary/builder"))
  }

  if (parks === 0) {
    return null;
  }
  return (
    <>
      <h2>List of Parks</h2>
      <select id="parkId" onChange={(event) => {
        handleInputItinerary(event)
         }}>      
        <option name="" value="0">Choose Park</option>
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
          handleSaveItinerary(event);
        }}
      >
        Save Itinerary
      </button>

      <h2>Saved Itineraries</h2>  
      <article className="savedItin">
        {
        filteredItin.map((savedItin) => <SavedItineraries key={`myItin--${savedItin.id}`}
        thisItin={savedItin}
        bizId={savedItin.bizId}
        eateryId={savedItin.eateryId}
        parkId={savedItin.parkId}
                />)
        }
      </article>
      {/* {
        itinerary.parkId !== "" ?
        <>
        <h2>5 Day Forecast for {selectPark.fullName}</h2>
        <table>
          <tr>
            <th></th>
            <th>{forecast.daily.time[1]}</th>
            <th>{forecast.daily.time[2]}</th>
            <th>{forecast.daily.time[3]}</th>
            <th>{forecast.daily.time[4]}</th>
            <th>{forecast.daily.time[5]}</th>
          </tr>
          <tr>
            <td>High</td>
            <td>{forecast.daily.temperature_2m_max[1]} °F</td>
            <td>{forecast.daily.temperature_2m_max[2]} °F</td>
            <td>{forecast.daily.temperature_2m_max[3]} °F</td>
            <td>{forecast.daily.temperature_2m_max[4]} °F</td>
            <td>{forecast.daily.temperature_2m_max[5]} °F</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>{forecast.daily.temperature_2m_min[1]} °F</td>
            <td>{forecast.daily.temperature_2m_min[2]} °F</td>
            <td>{forecast.daily.temperature_2m_min[3]} °F</td>
            <td>{forecast.daily.temperature_2m_min[4]} °F</td>
            <td>{forecast.daily.temperature_2m_min[5]} °F</td>
          </tr>
          <tr>
            <td>Chance of Rain</td>
            <td>{forecast.daily.precipitation_probability_mean[1]}%</td>
            <td>{forecast.daily.precipitation_probability_mean[2]}%</td>
            <td>{forecast.daily.precipitation_probability_mean[3]}%</td>
            <td>{forecast.daily.precipitation_probability_mean[4]}%</td>
            <td>{forecast.daily.precipitation_probability_mean[5]}%</td>
          </tr>
        </table>
        </> :
        ""
      } */}
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
