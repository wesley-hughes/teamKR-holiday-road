import { Outlet, Route, Routes } from "react-router-dom";
import { ItineraryBuilder} from "./itineraries/ItineraryBuilder";
import { Provider } from "./itineraries/Provider";


export const ApplicationView = () => {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/itinerary/builder" element={<ItineraryBuilder />} />
        </Route>
      </Routes>
    </Provider>
  );
};
