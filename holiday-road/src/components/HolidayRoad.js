import { Route, Routes } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import { NavBar } from "./navbar/NavBar";

export const HolidayRoad = () => {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <ApplicationView />
            </>
          }
        />
      </Routes>
      ;
    </>
  );
};
