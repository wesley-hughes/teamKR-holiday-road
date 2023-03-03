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
            })
            .then(setIsLoading(false))
    }, [])

    useEffect(() => {
        if (isLoading === true) {
            getGeoCodes(nashvilleObj.city, nashvilleObj.state)
            .then(res => setNashCoordinates(res))
            .then(getGeoCodes(biz.city, biz.state)
                .then(res => setBizCoordinates(res)))
            .then(getGeoCodes(eatery.city, eatery.state)
                .then(res => setEateryCoordinates(res)))
            .then(setAllCoordinates(true))
        }

        /* const setGeoCodes = (city, state) => {
            const coordinatesObj = getGeoCodes(city, state)
            return coordinatesObj
        }

        setNashCoordinates(setGeoCodes(nashvilleObj.city, nashvilleObj.state))
        const bizCoords = setGeoCodes(biz.city, biz.state)
        const eateryCoords = setGeoCodes(eatery.city, eatery.state) */

        /* if(nashvilleCoords.lat && bizCoords.lat && eateryCoords.lat) {
            getRoutes(nashvilleCoords.lat, nashvilleCoords.lng, park.latitude, park.longitude, bizCoords.lat, bizCoords.lng, eateryCoords.lat, eateryCoords.lng)
                .then(res => setRoute(res))
                .then(console.log(route))
        } */

    }, [isLoading])

    useEffect(() => {
        if (allCoordinates === true) {
            console.log(nashCoordinates.lat, nashCoordinates.lng)
            console.log(bizCoordinates.lat, bizCoordinates.lng)
            console.log(eateryCoordinates.lat, eateryCoordinates.lng)
            const parkLat = parseFloat(park.latitude)
            const parkLong = parseFloat(park.longitude)
            console.log(parkLat, parkLong)
            getRoute(nashCoordinates.lat, nashCoordinates.lng, bizCoordinates.lat, bizCoordinates.lng)
                .then(res => setRoute(res))
                .then(console.log(route))
        }
    }, [allCoordinates])

    //, bizCoordinates.lat, bizCoordinates.lng, eateryCoordinates.lat, eateryCoordinates.lng

    /* const setGeoCodes = (city, state) => {
        const coordinatesObj = getGeoCodes(city, state)
        return coordinatesObj
    }

    const nashvilleCoords = setGeoCodes(nashvilleObj.city, nashvilleObj.state)
    const bizCoords = setGeoCodes(biz.city, biz.state)
    const eateryCoords = setGeoCodes(eatery.city, eatery.state) */

    return <>
    <div>
        This is the id of the current itinerary id: {itinerary.id}
    </div>
    <div>
        Park Name: {park.fullName}
    </div>
    <div>
        Bizarrerie Name: {biz.name}
    </div>
    <div>
        Eatery Name: {eatery.businessName}
    </div>
    </>
}