import * as api from "../api/index.js";
import {
  AUTH_END_LOADING,
  AUTH_START_LOADING,
  END_LOADING,
  FETCH_USERS,
  LOGIN,
  ME,
  PASSWORD,
  REFRESH_TOKEN,
  REGISTER,
  START_LOADING,
  UPDATE_STATUS,
} from "../layout/app-action.js";
import { displayToast } from "../util/alert.js";

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
  } catch (err) {
    displayToast(`${err.response.data.msg}`, "error", "crimson");
  }
};
export const registration = (formData) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: REGISTER, data });
  } catch (err) {
    displayToast(`${err.response.data.msg}`, "error", "crimson");
  }
};
export const refreshToken = (accessToken) => async (dispatch) => {
  await dispatch({ type: REFRESH_TOKEN, payload: accessToken });
};
export const getUsers = () => async (dispatch) => {
  const { data } = await api.getUsers({ id: process.env.REACT_APP_RANDOM_ID });
  dispatch({ type: START_LOADING });
  await dispatch({ type: FETCH_USERS, data });
  dispatch({ type: END_LOADING });
};
export const updateStatus = (formData) => async (dispatch) => {
  const { data } = await api.status(formData);
  dispatch({ type: START_LOADING });
  dispatch({ type: UPDATE_STATUS, payload: data });
  dispatch({ type: END_LOADING });
};
export const disactiveStatus = (formData) => async (dispatch) => {
  const { data } = await api.disactive(formData);
  dispatch({ type: START_LOADING });
  dispatch({ type: UPDATE_STATUS, payload: data });
  dispatch({ type: END_LOADING });
};
export const me = (formData) => async (dispatch) => {
  const { data } = await api.me(formData);
  dispatch({ type: AUTH_START_LOADING });
  dispatch({ type: ME, payload: data });
  dispatch({ type: AUTH_END_LOADING });
};
export const changePassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: START_LOADING });
    dispatch({ type: PASSWORD, data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    displayToast(`${err.response.data}`, "error", "crimson");
    console.log(err);
  }
};
