import mongoose from "mongoose";
/* Creating a schema for the error model. */
const errorSchema = new mongoose.Schema({
  error_description: {
    type: String,
    minlength: 2,
    trim: true,
  },
  error_date: {
    type: String,
    minlength: 2,
    trim: true,
  },
});

const Error = mongoose.model("Error", errorSchema);

export default Error;
