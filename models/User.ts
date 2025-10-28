import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name:string;
  avatar:string;
  username: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
