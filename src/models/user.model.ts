import { model, Schema } from "mongoose";

import { EGenders } from "../types";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  name: { type: String },
  age: { type: Number },
  password: { type: String, require: true },
  gender: { type: String, enum: EGenders },
});

export const User = model("user", userSchema);
