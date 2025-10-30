import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from '../models/User';

export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt: string;
  author: Types.ObjectId | IUser;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
  likes: number;
  views: number;
  commentsCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    image: {
      type: String,
      default: '',
    },
    readTime: {
      type: Number,
      default: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
blogSchema.index({ author: 1, createdAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ isPublished: 1, isFeatured: 1 });

export default mongoose.model<IBlog>('Blog', blogSchema);
