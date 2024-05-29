import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks";
import Button from "@mui/material/Button";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <p>Welcome, {user.name}</p>
      <Button variant="contained" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
