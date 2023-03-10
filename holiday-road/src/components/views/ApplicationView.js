import { Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "../itineraries/Provider";
import { ItineraryBuilder} from "../itineraries/ItineraryBuilder";
import { SavedItineraries } from "../itineraries/SavedItineraries";
import { Directions } from "../itineraries/Directions";



export const ApplicationView = () => {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/itinerary/builder" element={<ItineraryBuilder />} />
          <Route path="/itinerary/saved" element={<SavedItineraries />} />
          <Route path="/itinerary/saved/:itineraryId/directions" element={<Directions />} />
        </Route>
      </Routes>
    </Provider>
  );
};
