import { Link, useNavigate } from "react-router-dom";

export const NavBar = (props) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <ul className="navbar flex flex-row">
        <li className="navbar__item active mx-3">
          <Link className="navbar__link" to="/">
            HolidayRoad
          </Link>
        </li>
        <li className="navbar__item active mx-3">
          <Link className="navbar__link" to="/itinerary/builder">
            Itinerary Builder
          </Link>
        </li>
      </ul>
      {localStorage.getItem("holiday_user") ? (
        <div className="navbar__item navbar__logout text-right">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("holiday_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
