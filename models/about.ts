import mongoose, { Schema, Document } from "mongoose";

export interface IWorkExperience {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface IBio {
  name: string;
  intro: string;
  blogLink: string;
}

export interface IAbout extends Document {
  bio: IBio;
  workExperiences: IWorkExperience[];
}

const WorkExperienceSchema: Schema = new Schema<IWorkExperience>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  responsibilities: [{ type: String, required: true }],
});

const BioSchema: Schema = new Schema<IBio>({
  name: { type: String, required: true },
  intro: { type: String, required: true },
  blogLink: { type: String, default: "#" },
});

const AboutSchema: Schema = new Schema<IAbout>(
  {
    bio: BioSchema,
    workExperiences: [WorkExperienceSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IAbout>("About", AboutSchema);
