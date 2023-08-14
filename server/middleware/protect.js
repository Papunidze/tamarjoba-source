import jwt from "jsonwebtoken";
import "dotenv/config";
const protect = async (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1]; //Access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else if (err.message === "jwt expired") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    } else {
      return res.status(403).json({ err, message: "User not authenticated" });
    }
  });
};

export default protect;
