import { Route, Routes } from "react-router-dom";
import { ApplicationView } from "./views/ApplicationView";
import { NavBar } from "./navbar/NavBar";
import { Authorized } from "./views/Authorized";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const HolidayRoad = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Authorized>
            <>
              <NavBar />
              <ApplicationView />
            </>
            </Authorized>
          }
        />
      </Routes>
      
    </>
  );
};
