import { NavLink, useLocation } from "react-router-dom";
import css from "./AuthNav.module.css";
import { Divider, Stack } from "@mui/material";

const AuthNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" color="FFFFFF" flexItem />}
      spacing={2}
    >
      <NavLink
        className={`${css.link} ${isActive("/register") ? css.active : ""}`}
        to="/register"
      >
        Register
      </NavLink>
      <NavLink
        className={`${css.link} ${isActive("/login") ? css.active : ""}`}
        to="/login"
      >
        Log In
      </NavLink>
    </Stack>
  );
};

export default AuthNav;
