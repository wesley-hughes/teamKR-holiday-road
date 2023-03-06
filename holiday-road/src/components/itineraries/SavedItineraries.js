import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./Provider";

//props from itineraryBuilder of matched objects
export const SavedItineraries = ({
  thisItin,
  parkId,
  bizId,
  eateryId,
  savedItinId,
}) => {
  const { getParkById, getBizById, getEateryById, deleteSavedItin } =
    useContext(TripContext);
  const [thisPark, setThisPark] = useState({});
  const [thisBiz, setThisBiz] = useState({});
  const [thisEatery, setThisEatery] = useState({});
  const [itinerary, setItinerary] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    setItinerary(thisItin);
  }, []);

  useEffect(() => {
    getParkById(parkId).then((newPark) => setThisPark(newPark));
    getBizById(bizId).then((thisBiz) => setThisBiz(thisBiz));
    getEateryById(eateryId).then((thisEatery) => setThisEatery(thisEatery));
  }, [itinerary]);

  return (
    <>
      <div className="border-2 rounded text-center bg-[#EDF7F6] m-2">
        <h2 className="font-semibold text-stone-800">My Trip</h2>
        <div>{thisPark?.fullName}</div>
        <div>{thisBiz?.name}</div>
        <div>{thisEatery?.businessName}</div>
        <div>
          <button type="button" onClick={() => navigate(`/itinerary/saved/${savedItinId}/directions`)}>
            Directions</button>
        </div>
        <div className="bottom-0 right-0">
          <button
            type="button"
            onClick={() => {
              deleteSavedItin(savedItinId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-0 ml-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
