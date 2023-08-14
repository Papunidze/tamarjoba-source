import express from "express";

import {
  changePassword,
  disActive,
  getUser,
  getUsers,
  login,
  refreshToken,
  register,
  updateStatus,
} from "../controllers/user.js";
import protect from "../middleware/protect.js";

const routes = express.Router();

routes.post("/login", login);
routes.post("/register", register);
routes.post("/refresh", refreshToken);
routes.post("/fetch", getUsers);
routes.patch("/status", updateStatus);
routes.patch("/active", disActive);
routes.get("/me/:id", getUser);
routes.patch("/password", changePassword);
export default routes;
