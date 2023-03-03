import { createContext, useState } from "react";

export const TripContext = createContext();

export const Provider = (props) => {
  const [parks, setParks] = useState([]);
  const [bizs, setBizs] = useState([]);
  const [eateries, setEateries] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [forecast, setForecast] = useState([]);

  const getParks = () => {
    return fetch(
      `https://developer.nps.gov/api/v1/parks?api_key=Uicno4BU7DEJYAVO50Jml7PdHax8TwXgwcryg2KX&limit=468`
    )
      .then((res) => res.json())
      .then((res) => setParks(res.data));
  };

  const getParkById = (parkId) => {
    return fetch(
      `https://developer.nps.gov/api/v1/parks?api_key=Uicno4BU7DEJYAVO50Jml7PdHax8TwXgwcryg2KX&id=${parkId}`
    )
      .then((res) => res.json())
      .then((newPark) => newPark.data[0]);
  };

  const getBizs = () => {
    return fetch(`http://holidayroad.nss.team/bizarreries`)
      .then((res) => res.json())
      .then((res) => setBizs(res));
  };

  const getBizById = (bizId) => {
    return fetch(`http://holidayroad.nss.team/bizarreries/${bizId}`).then(
      (res) => res.json()
    );
  };

  const getEateries = () => {
    return fetch(`http://holidayroad.nss.team/eateries`)
      .then((res) => res.json())
      .then((res) => setEateries(res));
  };

  const getEateryById = (eateryId) => {
    return fetch(`http://holidayroad.nss.team/eateries/${eateryId}`).then(
      (res) => res.json()
    );
  };

  const saveNewItinerary = (itinerary) => {
    return fetch(`http://localhost:8088/itineraries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    }).then(getItineraries);
  };

  const getItineraries = () => {
    return fetch(`http://localhost:8088/itineraries`)
      .then((res) => res.json())
      .then((res) => setItineraries(res));
  };

  const getForecast = (lat, long) => {
    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&elevation=nan&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data));
  };

  const getItinById = (itinId) => {
    return fetch(`http://localhost:8088/itineraries/${itinId}`)
      .then(response => response.json())
  }

  const deleteSavedItin = (itineraryId) => {
    return fetch(`http://localhost:8088/itineraries/${itineraryId}`, {
      method: "DELETE",
    }).then(() => {
      getItineraries();
    });
  };

  const getGeoCodes = (city, state) => {
    return fetch(`https://graphhopper.com/api/1/geocode?q=${city},${state}&key=5f45e565-75a1-4937-8ac8-e7604b0c254f&type=json&points_encoded=false`)
      .then(response => response.json())
      .then(res => res.hits[0].point)
  }

  const getRoute = (lat1, long1, lat2, long2, lat3, long3, lat4, long4) => {
    return fetch(`https://graphhopper.com/api/1/route?point=${lat1},${long1}&point=${lat2},${long2}&vehicle=car&debug=true&key=5f45e565-75a1-4937-8ac8-e7604b0c254f&type=json&points_encoded=false`)
      .then(response => response.json())
  }

  //&point=${lat3},${long3}&point=${lat4},${long4}

  return (
    <TripContext.Provider
      value={{
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
        getForecast,
        deleteSavedItin,
        getItinById,
        getGeoCodes,
        getRoute
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};
