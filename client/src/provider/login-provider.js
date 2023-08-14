import { useEffect, useMemo } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../action/user";

export const Auth = () => {
  const user = useSelector((action) => action.authReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      const decode = jwtDecode(
        JSON.parse(localStorage.getItem("profile"))?.accessToken
      );
      try {
        const { id } = decode;
        dispatch(me(id));
      } catch {
        localStorage.clear();
        return false;
      }
    }
  }, [dispatch]);
  const setAuthData = useMemo(() => {
    if (localStorage.getItem("profile")) {
      try {
        if (user !== null && user?.roles[0] === "admin") {
          return "admin";
        } else if (user !== null && user.status) {
          return true;
        } else if (!user?.status) {
          return "disactive";
        }
      } catch (err) {
        localStorage.clear();
        return false;
      }
    } else {
      return false;
    }
  }, [user]);

  return { setAuthData };
};

export default Auth;
