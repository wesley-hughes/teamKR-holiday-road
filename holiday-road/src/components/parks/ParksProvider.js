import { createContext, useState } from "react";

export const ParkContext = createContext();

export const ParkProvider = (props) => {
  const [parks, setParks] = useState([]);

  const getParks = () => {
    return fetch(
      "https://developer.nps.gov/api/v1/parks?api_key=cpgenrjIn3P0KlHF5j7jyaxeyCZ5dAUDNegzuiDg&limit=468"
    )
      .then((res) => res.json())
      .then(res => setParks(res.data));
  };

  return (
    <ParkContext.Provider
    value={{getParks, parks}}>
      {props.children}
    </ParkContext.Provider>
  )
};
