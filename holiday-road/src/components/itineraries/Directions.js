

import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TripContext } from "./Provider"

export const Directions = () => {
    const { getItinById, getParkById, getBizById, getEateryById, getGeoCodes, getRoute } = useContext(TripContext)
    const { itineraryId } = useParams()
    const [itinerary, setItinerary] = useState({})
    const [park, setPark] = useState({})
    const [biz, setBiz] = useState({})
    const [eatery, setEatery] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [nashCoordinates, setNashCoordinates] = useState({})
    const [bizCoordinates, setBizCoordinates] = useState({})
    const [eateryCoordinates, setEateryCoordinates] = useState({})
    const [allCoordinates, setAllCoordinates] = useState(false)
    const [route, setRoute] = useState({})
    const nashvilleObj = {
        city: "Nashville",
        state: "Tennessee"
    }

    useEffect(() => {
        getItinById(itineraryId)
            .then(res => {
                setItinerary(res)
                getParkById(res.parkId)
                    .then(thisPark => setPark(thisPark))
                getBizById(res.bizId)
                    .then(thisBiz => setBiz(thisBiz))
                getEateryById(res.eateryId)
                    .then(thisEatery => setEatery(thisEatery))
                    .then(() => setIsLoading(false))
                })
    }, [])

    // ALWAYS USE A CALLBACK FUNCTION INSIDE A .THEN
    useEffect(() => {
        if (isLoading === false) {
            getGeoCodes(nashvilleObj.city, nashvilleObj.state)
            .then(res => setNashCoordinates(res))
            .then(() => getGeoCodes(biz.city, biz.state)
                .then(res => setBizCoordinates(res)))
            .then(() => getGeoCodes(eatery.city, eatery.state)
                .then(res => setEateryCoordinates(res)))
            .then(() => setAllCoordinates(true))
        }

    }, [isLoading])

    useEffect(() => {
        if (allCoordinates === true) {
            console.log(nashCoordinates.lat, nashCoordinates.lng)
            console.log(bizCoordinates.lat, bizCoordinates.lng)
            console.log(eateryCoordinates.lat, eateryCoordinates.lng)
            const parkLat = parseFloat(park.latitude)
            const parkLong = parseFloat(park.longitude)
            console.log(parkLat, parkLong)
            getRoute(nashCoordinates.lat, nashCoordinates.lng, parkLat, parkLong, bizCoordinates.lat, bizCoordinates.lng, eateryCoordinates.lat, eateryCoordinates.lng)
                .then(res => setRoute(res.paths[0]))
        }
    }, [allCoordinates])

    console.log(route)

    const metersToMiles = (meters) => {
        return (meters / 1609.34).toFixed(1)
    }

    //, bizCoordinates.lat, bizCoordinates.lng, eateryCoordinates.lat, eateryCoordinates.lng

    if (!route.instructions) {
        return null
    }
    return <>
    <ol className="list-decimal">
        {
            route?.instructions.map(instruction => <li>{instruction.text} for {metersToMiles(instruction.distance)} miles</li>)
        }
    </ol>
    </>
}