import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Divider, Stack } from "@mui/material";
import css from "./Navigation.module.css";

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <NavLink
        className={`${css.link} ${isActive("/") ? css.active : ""}`}
        to="/"
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={`${css.link} ${isActive("/contacts") ? css.active : ""}`}
          to="/contacts"
        >
          Contacts
        </NavLink>
      )}
    </Stack>
  );
};

export default Navigation;
