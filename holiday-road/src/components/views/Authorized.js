import { Navigate, useLocation } from "react-router-dom";

export const Authorized = ({ children }) => {

  if (localStorage.getItem("holiday_user")) {
    return children;
  } else {
    return (
      <Navigate to={`/login/`}
      />
    );
  }
};
