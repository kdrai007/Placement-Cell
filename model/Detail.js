import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  student: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  scores: {
    dsa: {
      type: Number,
      required: true,
    },
    web: {
      type: Number,
      required: true,
    },
    react: {
      type: Number,
      required: true,
    },
  },
  interviews: [
    {
      company: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  results: [
    {
      company: {
        type: String,
        required: true,
      },
      result: {
        type: String,
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("student", studentSchema);

export default Student;
