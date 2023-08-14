import {
  END_LOADING,
  FETCH_USERS,
  LOGIN,
  LOGOUT,
  ME,
  PASSWORD,
  REFRESH_TOKEN,
  REGISTER,
  START_LOADING,
  UPDATE_STATUS,
} from "../layout/app-action";
import { displayToast } from "../util/alert";

const UserReducer = (
  state = { isLoading: true, users: null, allUsers: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, isLoading: true };
    }
    case END_LOADING: {
      return { ...state, isLoading: false };
    }
    case ME: {
      return { ...state, users: action.payload };
    }
    case LOGIN: {
      window.location.href = "/";
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...state };
    }
    case REGISTER:
      window.location.href = "/";
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...state };
    case REFRESH_TOKEN:
      return {
        ...state,
        user: {
          accessToken: JSON.parse(localStorage.getItem("profile")).accessToken,
        },
      };
    case FETCH_USERS:
      return {
        ...state,
        allUsers: action.data,
      };
    case LOGOUT: {
      localStorage.clear();
      window.location.href = "/";
      return { ...state };
    }
    case UPDATE_STATUS: {
      return {
        ...state,
        allUsers: state.allUsers.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
    }
    case PASSWORD: {
      displayToast(`პაროლი წარმატებით შეიცვალა`, "success", "green");
      return state;
    }
    default:
      return state;
  }
};

export default UserReducer;
