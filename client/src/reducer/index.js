import { combineReducers } from "redux";
import UserReducer from "./user";
import questReducer from "./quest";
import authReducer from "./auth";
import scheduleReducer from "./schedule";

export const reducers = combineReducers({
  UserReducer,
  questReducer,
  authReducer,
  scheduleReducer,
});
