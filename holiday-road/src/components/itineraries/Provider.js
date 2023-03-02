import { createContext, useState } from "react";

export const TripContext = createContext();

export const Provider = (props) => {
  const [parks, setParks] = useState([]);
  const [bizs, setBizs] = useState([])
  const [eateries, setEateries] = useState([])
  const [itineraries, setItineraries] = useState([])


  const getParks = () => {
    return fetch(
      `https://developer.nps.gov/api/v1/parks?api_key=cpgenrjIn3P0KlHF5j7jyaxeyCZ5dAUDNegzuiDg&limit=468`
      )
      .then((res) => res.json())
      .then(res => setParks(res.data));
  };
  const getParkById = (parkId) => {
    return fetch(
      `https://developer.nps.gov/api/v1/parks?api_key=cpgenrjIn3P0KlHF5j7jyaxeyCZ5dAUDNegzuiDg&id=${parkId}`
    )
      .then((res) => res.json())
  };

const getBizs = () => {
  return fetch(`http://holidayroad.nss.team/bizarreries`)
  .then(res => res.json())
  .then(res => setBizs(res))
}

const getBizById = (bizId) => {
  return fetch(`http://holidayroad.nss.team/bizarreries/${bizId}`)
  .then(res => res.json())
}

const getEateries = () => {
  return fetch(`http://holidayroad.nss.team/eateries`)
  .then(res => res.json())
  .then(res => setEateries(res))
}

const getEateryById = (eateryId) => {
  return fetch(`http://holidayroad.nss.team/eateries/${eateryId}`)
  .then(res => res.json())
}

const saveNewItinerary = (itinerary) => {
  return fetch(`http://localhost:8088/itineraries`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(itinerary),
}).then(getItineraries)
}

const getItineraries = () => {
  return fetch(`http://localhost:8088/itineraries`)
  .then(res => res.json())
  .then(res => setItineraries(res))
}


  return (
    <TripContext.Provider
    value={{getParks, parks, getBizs, bizs, getEateries, eateries, getEateryById, getBizById, getParkById, saveNewItinerary, getItineraries, itineraries}}>
      {props.children}
    </TripContext.Provider>
  )
};