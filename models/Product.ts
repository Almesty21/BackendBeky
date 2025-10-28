import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  link: string;
  downloadLink: string;
  image: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    downloadLink: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
