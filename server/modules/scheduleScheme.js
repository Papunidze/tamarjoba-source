import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scheduleScheme = new Schema({
  name: { type: String, required: true },
  city: { type: String, require: true },
  addres: { type: String, require: true },
  group: { type: String, require: true },
  address: { type: String, require: true },
  date: { type: Array, require: true },
});

const Schedule = mongoose.model("Schedule", scheduleScheme);

export default Schedule;
