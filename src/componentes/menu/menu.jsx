import { NavLink } from "react-router-dom";
import "./menu.css";
import { useContext } from "react";
import DataLocalContext from "../../context/contextDataLocal";

const Menu = () => {
  const { dataLocal } = useContext(DataLocalContext);
  return (
    <nav className="d-flex align-items-center justify-content-between gap-6 bottom-0 menu">
      <h2 className="menu__logo">
        <NavLink to="/">
          <span className="verde-claro">See</span>
          Later
        </NavLink>
      </h2>
      <div className="d-flex menu__enlaces">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "menu--spy" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "menu--spy" : "")}
        >
          Movies
        </NavLink>
        <NavLink
          to="/anime"
          className={({ isActive }) => (isActive ? "menu--spy" : "")}
        >
          Animes
        </NavLink>
        <NavLink
          to="/series"
          className={({ isActive }) => (isActive ? "menu--spy" : "")}
        >
          Series
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) => (isActive ? "menu--spy" : "")}
        >
          <p className="position-relative">
            Saved
            <span
              className="position-absolute "
              style={{
                color: "red",

                marginTop: "-.7rem",
                marginLeft: ".1rem",
              }}
            >
              {dataLocal.length > 0 && (
                <i
                  class="bi bi-circle-fill"
                  style={{
                    fontSize: ".5rem",
                  }}
                ></i>
              )}
            </span>
          </p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Menu;
