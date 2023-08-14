import * as api from "../api/index.js";
import {
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  END_LOADING,
  FETCH_SCHEDULE,
  GROUP_SCHEDULE,
  POST_SCHEDULE,
  START_LOADING,
} from "../layout/app-action.js";

export const getSchedule = () => async (dispatch) => {
  const { data } = await api.scheduleGet();
  dispatch({ type: START_LOADING });
  await dispatch({ type: FETCH_SCHEDULE, payload: data });
  dispatch({ type: END_LOADING });
};
export const scheduleCreate = (formData) => async (dispatch) => {
  const { data } = await api.creteSchedule(formData);
  dispatch({ type: START_LOADING });
  await dispatch({ type: POST_SCHEDULE, payload: data });
  dispatch({ type: END_LOADING });
};
export const scheduleEdit = (formData, Id) => async (dispatch) => {
  const { data } = await api.editSchedule(formData, Id);
  dispatch({ type: START_LOADING });
  await dispatch({ type: EDIT_SCHEDULE, payload: data });
  dispatch({ type: END_LOADING });
};
export const scheduleDelete = (Id) => async (dispatch) => {
  const { data } = await api.deleteSchedule(Id);
  dispatch({ type: START_LOADING });
  await dispatch({ type: DELETE_SCHEDULE, payload: data });
  dispatch({ type: END_LOADING });
};
export const groupSchedul = (formData) => async (dispatch) => {
  const { data } = await api.getScheduleByGroup(formData);

  dispatch({ type: START_LOADING });
  await dispatch({ type: GROUP_SCHEDULE, payload: data });
  dispatch({ type: END_LOADING });
};
