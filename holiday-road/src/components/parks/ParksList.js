import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParkContext } from "./ParksProvider";

export const ParksList = () => {
  const { getParks, parks } = useContext(ParkContext);
  const navigate = useNavigate();


  useEffect(() => {
    getParks();
  }, []);
console.log(parks)

if(parks === 0){
    return null
} 
  return <>
  <h2>List of Parks</h2>
  <ul>
  {
    parks.map(park => <li>{park.fullName}</li>)
  }
  </ul>
  
  
  
  </>
};
