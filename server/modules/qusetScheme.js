import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questScheme = new Schema({
  section: { type: Number, default: 1 },
  title: { type: String, required: true },
  answer: { type: [String], required: true, minLenght: 4, maxLenght: 4 },
  correctanswer: { type: Number, required: true },
  content: { type: String, default: "" },
  counter: { type: Number, required: true },
});

const Quest = mongoose.model("Quest", questScheme);

export default Quest;
