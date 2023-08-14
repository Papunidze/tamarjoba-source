import express from "express";
import {
  addSchedule,
  deleteSchedule,
  editSchedule,
  getSchedule,
  getScheduleByGroup,
} from "../controllers/schedule.js";

const routes = express.Router();

routes.get("/", getSchedule);
routes.post("/group", getScheduleByGroup);
routes.post("/create", addSchedule);
routes.patch("/edit/:id", editSchedule);
routes.delete("/delete/:id", deleteSchedule);
export default routes;
