import { useContext, useEffect, useState } from "react"
import { TripContext } from "./Provider"

//props from itineraryBuilder of matched objects
export const SavedItineraries = ({ parkName, bizName, eateryName }) => {

    return <>
    <div>{parkName}</div>
    <div>{bizName}</div>
    <div>{eateryName}</div>
    </>
}