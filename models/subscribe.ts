import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  email: string;
}

const SubscriptionSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
