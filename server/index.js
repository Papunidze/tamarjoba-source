import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import qusetRouter from "./routes/quset.js";
import scheduleRouter from "./routes/schedule.js";
import "dotenv/config";
import Quest from "./modules/qusetScheme.js";
import Error from "./modules/errorScheme.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/quest", qusetRouter);
app.use("/schedule", scheduleRouter);
const CONNECTION_URL = `mongodb+srv://${process.env.MONGOOSE_LOGIN}:${process.env.MONGOOSE_PASSWORD}@${process.env.MONGOOSE_CLASTER}`;
const PORT = process.env.PORT || 5000;

// app.post("/create", (req, res) => {
//   const quest = req.body;
//   try {
//     quest.forEach((element, index) => {
//       let quests = new Quest({
//         section: 3, //gnasazgvret seqcia
//         title: element.title,
//         answer: element.answer,
//         correctanswer: element.correctanswer,
//         counter: element.counter,
//         content: "",
//       });
//       quests
//         .save()
//         .then(() => {})
//         .catch((err) => {
//           // console.log(index + ": " + err.message);
//         });
//     });
//     res.send("work");
//   } catch (err) {
//     res.send(err.message);
//   }
// });
// app.patch("/create", async (req, res) => {
//   const quest = req.body;
//   try {
//     quest.forEach((element, index) => {
//       Quest.findOneAndUpdate(
//         { counter: element.counter, section: 1 },
//         { $set: { content: element.content } },
//         { new: true }
//       )
//         .then((st) => {
//           res.status(200).send(st);
//         })
//         .catch((err) => {
//           console.log(index, err.message);
//         });
//     });
//     res.send("work");
//   } catch (err) {
//     res.send(err.message);
//   }
// });
process.on("uncaughtException", function (err) {
  let error_description = err;
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let error_date = date + " " + time;
  let newError = new Error({
    error_description,
    error_date,
  });
  newError.save();
  console.log("========================================");
  console.log(newError);
  console.log("Some error appeared , while using server");
  console.log("========================================");
});

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
