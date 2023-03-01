import { Link } from "react-router-dom";

export const NavBar = (props) => {
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
    </ul>
  );
};
