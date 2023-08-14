import * as api from "../api/index.js";
import {
  END_LOADING_QUEST,
  FETCH_QUIZ,
  SEND_RESULT,
  START_LOADING_QUEST,
  FETCH_ALL,
  CREATE_QUEST,
  UPDATE_QUEST,
} from "../layout/app-action.js";
import { displayToast } from "../util/alert.js";

export const getQuest = () => async (dispatch) => {
  const { data } = await api.getQuest();
  dispatch({ type: START_LOADING_QUEST });
  await dispatch({ type: FETCH_QUIZ, payload: data });
  dispatch({ type: END_LOADING_QUEST });
};
export const sendResult = (formData) => async (dispatch) => {
  try {
    const { data } = await api.sendResult(formData);
    dispatch({ type: START_LOADING_QUEST });
    dispatch({ type: SEND_RESULT, payload: data });
    dispatch({ type: END_LOADING_QUEST });
  } catch (err) {
    displayToast(`${err.message}`, "success", "green");
  }
};
export const fetchAll = () => async (dispatch) => {
  const { data } = await api.fetchAll();
  dispatch({ type: START_LOADING_QUEST });
  dispatch({ type: FETCH_ALL, payload: data });
  dispatch({ type: END_LOADING_QUEST });
};
export const createQuest = (finalResult) => async (dispatch) => {
  const { data } = await api.createQuest(finalResult);
  dispatch({ type: START_LOADING_QUEST });
  dispatch({ type: CREATE_QUEST, payload: data });
  dispatch({ type: END_LOADING_QUEST });
};
export const editQuest = (formData) => async (dispatch) => {
  const { data } = await api.editQuest(formData);
  dispatch({ type: START_LOADING_QUEST });
  dispatch({ type: UPDATE_QUEST, payload: data });
  dispatch({ type: END_LOADING_QUEST });
};
