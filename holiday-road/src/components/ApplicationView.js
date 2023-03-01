import { Outlet, Route, Routes } from "react-router-dom";
import { ParksList } from "./parks/ParksList";
import { ParkProvider } from "./parks/ParksProvider";


export const ApplicationView = () => {
  return (
    <ParkProvider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/parks" element={<ParksList />} />
        </Route>
      </Routes>
    </ParkProvider>
  );
};
