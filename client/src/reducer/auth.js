import { AUTH_END_LOADING, ME, AUTH_START_LOADING } from "../layout/app-action";

const authReducer = (state = { isLoading: true, users: null }, action) => {
  switch (action.type) {
    case AUTH_START_LOADING: {
      return { ...state, isLoading: true };
    }
    case AUTH_END_LOADING: {
      return { ...state, isLoading: false };
    }
    case ME: {
      return { ...state, users: action.payload };
    }

    default:
      return state;
  }
};

export default authReducer;
