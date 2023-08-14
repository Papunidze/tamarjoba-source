import axios from "axios";
import { refreshToken } from "../action/user";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://tamarjoba1.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export const login = (data) => API.post("/user/login", data);
export const register = (data) => API.post("/user/register", data);
export const getUsers = (data) => API.post("/user/fetch", data);
export const getQuest = () => API.get("quest/fetchQuest");
export const sendResult = (data) => API.post("/quest/sendresult", data);
export const fetchAll = () => API.get("/quest/fetchall");
export const status = (data) => API.patch("/user/status", data);
export const disactive = (data) => API.patch("/user/active", data);
export const createQuest = (data) => API.post("/quest/create", data);
export const editQuest = (data) => API.patch("/quest/editQuest", data);
export const getScheduleByGroup = (data) => API.post("/schedule/group", data);
export const creteSchedule = (data) => API.post("/schedule/create", data);
export const scheduleGet = (data) => API.get("/schedule/", data);
export const editSchedule = (data, id) =>
  API.patch(`/schedule/edit/${id}`, data);
export const deleteSchedule = (id) => API.delete(`/schedule/delete/${id}`);
export const me = (id) => API.get(`/user/me/${id}`);
export const changePassword = (data) => API.patch("/user/password", data);
export const setup = (store) => {
  API.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("profile")) {
        config.headers["Authorization"] =
          "Bearer " + JSON.parse(localStorage.getItem("profile")).accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { dispatch } = store;

  API.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/user/login" && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            API.post("/user/refresh", {
              token: JSON.parse(localStorage.getItem("profile")).refreshToken,
            })
              .then((response) => {
                const { accessToken } = response.data;
                dispatch(refreshToken(accessToken));
                let user = JSON.parse(localStorage.getItem("profile"));
                user.accessToken = accessToken;
                localStorage.setItem("profile", JSON.stringify(user));
                return API(originalConfig);
              })
              .catch((err) => {
                localStorage.clear();
                window.location.href = "/";
              });
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
