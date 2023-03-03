import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./Provider";
import { Weather } from "./Weather";
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
    getForecast,
  } = useContext(TripContext);
  const navigate = useNavigate();
  const [selectPark, setSelectPark] = useState({});
  const [biz, setBiz] = useState({});
  const [eatery, setEatery] = useState({});
  const [filteredItin, setFilteredItin] = useState([]);
  const [itinerary, setItinerary] = useState({
    parkId: "",
    bizId: "",
    eateryId: "",
    userId: "",
  });
  const parkDialog = useRef();
  const bizDialog = useRef();
  const eateryDialog = useRef();

  const [modal, setModal] = useState(false);

  const [showButtons, setShowButtons] = useState(false);

  const holidayUserObj = JSON.parse(localStorage.getItem("holiday_user"));

  useEffect(() => {
    getParks().then(getBizs()).then(getEateries()).then(getItineraries());
  }, []);

  useEffect(() => {
    const myItin = itineraries.filter(
      (itin) => itin.userId === holidayUserObj.id
    );
    setFilteredItin(myItin);
  }, [itineraries]);

  const whichDetailClicked = (e) => {
    const detailClicked = e.target.value;
    if (detailClicked === "parkDetails") {
      setModal(true);
      parkDialog.current.showModal();
    } else if (detailClicked === "bizDetails") {
      setModal(true);
      bizDialog.current.showModal();
    } else if (detailClicked === "eateryDetails") {
      setModal(true);
      eateryDialog.current.showModal();
    }
  };

  useEffect(() => {
    if (itinerary.parkId) {
      getParkById(itinerary.parkId).then((thisPark) => {
        setSelectPark(thisPark);
        const lat = parseFloat(thisPark.latitude).toFixed(4);
        const long = parseFloat(thisPark.longitude).toFixed(4);
        getForecast(lat, long);
      });
    }
    getBizById(itinerary.bizId).then((thisBiz) => setBiz(thisBiz));
    getEateryById(itinerary.eateryId).then((thisEatery) =>
      setEatery(thisEatery)
    );
  }, [itinerary]);

  const handleInputItinerary = (event) => {
    const newItinerary = { ...itinerary };
    newItinerary[event.target.id] = event.target.value;
    // newItinerary[event.target.title] = event.target.name
    setItinerary(newItinerary);
  };

  const handleSaveItinerary = (event) => {
    const newItinerary = {
      parkId: itinerary.parkId,
      bizId: parseInt(itinerary.bizId),
      eateryId: parseInt(itinerary.eateryId),
      userId: holidayUserObj.id,
    };
    saveNewItinerary(newItinerary).then(() => navigate("/itinerary/builder"));
  };

  if (parks === 0) {
    return null;
  }
  return (
    <>
      <div className="absolute left-0 w-[75%]">
        <h2 className="header">List of Parks</h2>
        <select
          className="dropdown"
          id="parkId"
          onChange={(event) => {
            handleInputItinerary(event);
            setShowButtons(true);
          }}
        >
          <option name="" value="0">
            Choose Park
          </option>
          {parks.map((park) => (
            <option key={`park--${park.id}`} value={`${park.id}`}>
              {park.fullName}
            </option>
          ))}
        </select>

        <h2 className="header">List of Bizarreries</h2>
        <select
          className="dropdown"
          id="bizId"
          onChange={(event) => {
            handleInputItinerary(event);
            setShowButtons(true);
          }}
        >
          <option value="0">Choose Bizarrerie</option>
          {bizs.map((biz) => (
            <option key={`biz--${biz.id}`} value={`${biz.id}`}>
              {biz.name}
            </option>
          ))}
        </select>

        <h2 className="header">List of Eateries</h2>
        <select
          className="dropdown"
          id="eateryId"
          onChange={(event) => {
            handleInputItinerary(event);
            setShowButtons(true);
          }}
        >
          <option value="0">Choose Eatery</option>
          {eateries.map((eatery) => (
            <option key={`eatery--${eatery.id}`} value={`${eatery.id}`}>
              {eatery.businessName}
            </option>
          ))}
        </select>

        <h2 className="header">Itinerary Preview</h2>
        <div className="flex flex-col justify-between">
          Park: {selectPark.fullName}{" "}
          {showButtons ? (
            <button
              className="button"
              type="button"
              value="parkDetails"
              onClick={(e) => {
                whichDetailClicked(e);
              }}
            >
              Details
            </button>
          ) : (
            ""
          )}
          Bizarrerie: {biz.name}{" "}
          {showButtons ? (
          <button
            className="button"
            type="button"
            value="bizDetails"
            onClick={(e) => whichDetailClicked(e)}
          >
            Details
          </button>
          ) : (
            ""
          )}
          Eatery: {eatery.businessName}{" "}
          {showButtons ? (
          <button
            className="button"
            type="button"
            value="eateryDetails"
            onClick={(e) => whichDetailClicked(e)}

          >
            Details
          </button>
          ) : (
            ""
          )}
        </div>
        <button
          type="button"
          className="button__save"
          onClick={(event) => {
            handleSaveItinerary(event);
          }}
        >
          Save Itinerary
        </button>

        {/* WEATHER */}

        {selectPark.parkCode && forecast !== [] ? (
          <Weather park={selectPark.fullName} forecast={forecast} />
        ) : (
          ""
        )}

            {/* MODAL DIALOGS */}

        <dialog ref={parkDialog}>
          <div>{selectPark.description}</div>
          <button
            className="button--close"
            onClick={(e) => {
              parkDialog.current.close();
              setModal(false);
            }}
          >
            Close
          </button>
        </dialog>
        <dialog ref={bizDialog}>
          <div>{biz.description}</div>
          <button
            className="button--close"
            onClick={(e) => {
              bizDialog.current.close();
              setModal(false);
            }}
          >
            Close
          </button>
        </dialog>
        <dialog ref={eateryDialog}>
          <div>{eatery.description}</div>
          <button
            className="button--close"
            onClick={(e) => {
              eateryDialog.current.close();
              setModal(false);
            }}
          >
            Close
          </button>
        </dialog>
      </div>


      {/* SAVED ITINERARIES */}

      <aside className="absolute  bg-[#2660A4] inline-block right-0 w-[25%]">
        <h2 className="text-xl text-center text-[#EDF7F6] font-bold">Saved Itineraries</h2>
        <article className="savedItin">
          {filteredItin.map((savedItin) => (
            <SavedItineraries
              savedItinId={savedItin.id}
              key={`myItin--${savedItin.id}`}
              thisItin={savedItin}
              bizId={savedItin.bizId}
              eateryId={savedItin.eateryId}
              parkId={savedItin.parkId}
            />
          ))}
        </article>
      </aside>
    </>
  );
};
