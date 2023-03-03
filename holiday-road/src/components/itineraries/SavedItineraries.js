import { useContext, useEffect, useState } from "react"
import { TripContext } from "./Provider"

//props from itineraryBuilder of matched objects
export const SavedItineraries = ({ thisItin, parkId, bizId, eateryId }) => {
    const { getParkById, getBizById, getEateryById } = useContext(TripContext)
    const [thisPark, setThisPark ] = useState({})
    const [thisBiz, setThisBiz ] = useState({})
    const [ thisEatery, setThisEatery ] = useState({})
    const [ itinerary, setItinerary ] = useState( {})

    useEffect(() => {
        setItinerary(thisItin)
    },[])


     useEffect(() => {
        getParkById(parkId)
        .then(newPark => setThisPark(newPark))
        getBizById(bizId)
        .then(thisBiz => setThisBiz(thisBiz))
        getEateryById(eateryId)
        .then(thisEatery => setThisEatery(thisEatery))
       },[itinerary])


return <>
    <h2>My Trip</h2>
    <div>{thisPark?.fullName}</div>
    <div>{thisBiz?.name}</div>
    <div>{thisEatery?.businessName}</div>
     </> 
}