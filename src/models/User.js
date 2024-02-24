import mongoose from "mongoose";
import { hash } from "bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(user.password, 10);
  }
  next();
});

export default model("User", UserSchema);
