import { Link, useNavigate } from "react-router-dom";

export const NavBar = (props) => {
  const navigate = useNavigate()
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          HolidayRoad
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/itinerary/builder">
          Itinerary Builder
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/itinerary/saved">
          Saved Itineraries
        </Link>
      </li>
      {localStorage.getItem("holiday_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("holiday_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
