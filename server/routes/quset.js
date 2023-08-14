import express from "express";
import {
  createQuest,
  editQuest,
  fetchAllQuest,
  getQuest,
  sendResult,
} from "../controllers/quest.js";

import protect from "../middleware/protect.js";

const routes = express.Router();

routes.post("/create", createQuest);
routes.get("/fetchQuest", getQuest);
routes.get("/fetchall", fetchAllQuest);
routes.post("/sendresult", sendResult);
routes.patch("/editQuest", editQuest);

export default routes;
