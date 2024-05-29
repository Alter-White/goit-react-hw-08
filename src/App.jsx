import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks";
import Modal from "react-modal";
import Layout from "./components/Layout";
import { refreshUser } from "./redux/auth/operations";

const Home = lazy(() => import("./pages/Home"));
const Registration = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));
const Contacts = lazy(() => import("./pages/Contacts"));

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={Registration} />
          }
        />
        <Route
          path="login"
          element={<RestrictedRoute redirectTo="/contacts" component={Login} />}
        />
        <Route
          path="contacts"
          element={<PrivateRoute redirectTo="/login" component={Contacts} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
