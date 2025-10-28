import { Types } from 'mongoose';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  blogId: string;
  parentId?: string;
  likes: number;
  mentions: string[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
  likes: number;
  views: number;
  commentsCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  isPublished?: boolean;
}

export interface UpdateBlogPayload extends Partial<CreateBlogPayload> {
  id: string;
}

export interface CreateCommentPayload {
  content: string;
  blogId: string;
  author?: string;
  parentId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}