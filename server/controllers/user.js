import User from "../modules/userScheme.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
let refreshTokens = [];
const randomID = "kfe7fc8a-a237-4e12-b2ba-1efada357c22";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ msg: "ინფორმაცია არ მოიძებნა" });
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(400).send({ msg: "იმეილი არ მოიძებნა" });

    if (password !== user.password)
      return res.status(400).send({ msg: "შეიყვანეთ სწორი პაროლი" });
    let accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1sec",
      }
    );
    let refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    refreshTokens.push(refreshToken);
    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({ msg: "მითითებული იმეილი უკვე არსებობბს" });
    }

    const user = await User.create({
      name,
      lastname,
      email: email.toLowerCase(),
      password,
    });
    let accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    let refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1y",
      }
    );
    refreshTokens.push(refreshToken);
    res.json({
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshToken = async (req, res) => {
  const { token } = req.body;
  const refreshToken = token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.json({ message: "Refresh token not found, login again" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (!err) {
      const accessToken = jwt.sign(
        { username: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      return res.json({ success: true, accessToken });
    } else {
      return res.json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  });
};

export const getUsers = async (req, res) => {
  if (req.body.id === randomID) {
    try {
      const user = await User.find();
      res.send(user);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.status(404);
  }
};
export const updateStatus = (req, res) => {
  const { _id, status } = req.body;

  User.findByIdAndUpdate({ _id }, { $set: { status: status } }, { new: true })
    .then((st) => {
      res.status(200).send(st);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
export const disActive = (req, res) => {
  const { _id, active } = req.body;

  User.findByIdAndUpdate({ _id }, { $set: { active: active } }, { new: true })
    .then((st) => {
      res.status(200).send(st);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      status: user.status,
      roles: user.roles,
    });
  } catch (err) {
    res.send(err.message);
  }
};
export const changePassword = async (req, res) => {
  const { id, password, newPassword } = req.body;
  console.log(newPassword);
  const user = await User.findById(id);

  if (user.password !== password) {
    res.status(403).send("ძველი პაროლი არასწორია");
  } else {
    User.findByIdAndUpdate(
      id,
      { $set: { password: newPassword } },
      { new: true }
    )
      .then(() => {
        res.status(201).send("პაროლი წამატებით შეიცვალა");
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }
};
