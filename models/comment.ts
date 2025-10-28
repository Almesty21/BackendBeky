import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from '../models/user';
import { IBlog } from '../models/blog';

export interface IComment extends Document {
  content: string;
  author: Types.ObjectId | IUser;
  blog: Types.ObjectId | IBlog;
  parentComment?: Types.ObjectId | IComment;
  likes: number;
  mentions: string[];
  isEdited: boolean;
  replies: Types.ObjectId[] | IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
    mentions: [{
      type: String,
      trim: true,
    }],
    isEdited: {
      type: Boolean,
      default: false,
    },
    replies: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
commentSchema.index({ blog: 1, createdAt: -1 });
commentSchema.index({ author: 1 });
commentSchema.index({ parentComment: 1 });

export default mongoose.model<IComment>('Comment', commentSchema);