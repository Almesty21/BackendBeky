import { Types } from 'mongoose';
import Blog, { IBlog } from '../models/blog';
import Comment, { IComment } from '../models/comment';
import User, { IUser } from '../models/user';
import {
  CreateBlogPayload,
  UpdateBlogPayload,
  CreateCommentPayload,
  QueryParams,
  ApiResponse,
  PaginatedResponse
} from '../types/blog';

export class BlogService {
  // Blog CRUD Operations
  async createBlog(data: CreateBlogPayload): Promise<ApiResponse<IBlog>> {
    try {
      // Calculate read time
      const readTime = this.calculateReadTime(data.content);
      
      const blogData = {
        ...data,
        readTime,
        author: new Types.ObjectId(data.author),
        tags: data.tags || [],
        isPublished: data.isPublished ?? true
      };

      const blog = new Blog(blogData);
      await blog.save();
      
      // Populate author before returning
      await blog.populate('author', 'name email avatar bio');

      return {
        success: true,
        data: blog,
        message: 'Blog created successfully'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create blog');
    }
  }

  async getBlogs(params: QueryParams = {}): Promise<PaginatedResponse<IBlog[]>> {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;

      // Build query
      const query: any = { isPublished: true };
      
      if (params.category) {
        query.category = { $regex: params.category, $options: 'i' };
      }
      
      if (params.search) {
        query.$or = [
          { title: { $regex: params.search, $options: 'i' } },
          { content: { $regex: params.search, $options: 'i' } },
          { excerpt: { $regex: params.search, $options: 'i' } },
          { tags: { $in: [new RegExp(params.search, 'i')] } }
        ];
      }

      // Build sort
      const sort: any = {};
      if (params.sortBy) {
        sort[params.sortBy] = params.sortOrder === 'asc' ? 1 : -1;
      } else {
        sort.createdAt = -1; // Default sort by newest
      }

      const [blogs, total] = await Promise.all([
        Blog.find(query)
          .populate('author', 'name email avatar bio')
          .sort(sort)
          .skip(skip)
          .limit(limit),
        Blog.countDocuments(query)
      ]);

      return {
        success: true,
        data: blogs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blogs');
    }
  }

  async getBlogById(id: string): Promise<ApiResponse<IBlog>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return {
          success: false,
          message: 'Invalid blog ID'
        };
      }

      const blog = await Blog.findById(id)
        .populate('author', 'name email avatar bio');

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      // Increment views
      blog.views += 1;
      await blog.save();

      return {
        success: true,
        data: blog
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blog');
    }
  }

 async updateBlog(id: string, data: UpdateBlogPayload): Promise<ApiResponse<IBlog>> {
  try {
    if (!Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: 'Invalid blog ID'
      };
    }

    const updateData: any = { ...data };
    
    // Calculate read time if content is updated
    if (data.content) {
      updateData.readTime = this.calculateReadTime(data.content);
    }

    // Ensure updatedAt is always set
    updateData.updatedAt = new Date();

    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email avatar bio');

    if (!blog) {
      return {
        success: false,
        message: 'Blog not found'
      };
    }

    return {
      success: true,
      data: blog,
      message: 'Blog updated successfully'
    };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update blog');
  }
}
  async deleteBlog(id: string): Promise<ApiResponse<void>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return {
          success: false,
          message: 'Invalid blog ID'
        };
      }

      const blog = await Blog.findByIdAndDelete(id);

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      // Also delete associated comments
      await Comment.deleteMany({ blog: id });

      return {
        success: true,
        message: 'Blog deleted successfully'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete blog');
    }
  }

  // Comment Operations
  async getComments(blogId: string): Promise<ApiResponse<IComment[]>> {
    try {
      if (!Types.ObjectId.isValid(blogId)) {
        return {
          success: false,
          message: 'Invalid blog ID'
        };
      }

      const comments = await Comment.find({ blog: blogId, parentComment: null })
        .populate('author', 'name email avatar')
        .populate({
          path: 'replies',
          populate: {
            path: 'author',
            select: 'name email avatar'
          }
        })
        .sort({ createdAt: -1 });

      return {
        success: true,
        data: comments,
        message: 'Comments fetched successfully'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch comments');
    }
  }

  async createComment(payload: CreateCommentPayload): Promise<ApiResponse<IComment>> {
    try {
      const { content, blogId, author, parentId } = payload;

      if (!Types.ObjectId.isValid(blogId)) {
        return {
          success: false,
          message: 'Invalid blog ID'
        };
      }

      // Check if blog exists
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      const commentData: any = {
        content,
        blog: blogId,
        author: new Types.ObjectId(author),
        mentions: content.match(/@(\w+)/g)?.map(mention => mention.substring(1)) || []
      };

      if (parentId) {
        if (!Types.ObjectId.isValid(parentId)) {
          return {
            success: false,
            message: 'Invalid parent comment ID'
          };
        }
        commentData.parentComment = parentId;
      }

      const comment = new Comment(commentData);
      await comment.save();

      // If it's a reply, add to parent comment's replies
      if (parentId) {
        await Comment.findByIdAndUpdate(parentId, {
          $push: { replies: comment._id }
        });
      }

      // Update blog comments count
      blog.commentsCount += 1;
      await blog.save();

      // Populate author before returning
      await comment.populate('author', 'name email avatar');

      return {
        success: true,
        data: comment,
        message: 'Comment created successfully'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create comment');
    }
  }

  // Reaction Operations
  async likeBlog(blogId: string): Promise<ApiResponse<{ likes: number }>> {
    try {
      if (!Types.ObjectId.isValid(blogId)) {
        return {
          success: false,
          message: 'Invalid blog ID'
        };
      }

      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { likes: 1 } },
        { new: true }
      );

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      return {
        success: true,
        data: { likes: blog.likes },
        message: 'Blog liked successfully'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to like blog');
    }
  }

  async likeComment(commentId: string): Promise<ApiResponse<{ likes: number }>> {
    try {
      if (!Types.ObjectId.isValid(commentId)) {
        return {
          success: false,
          message: 'Invalid comment ID'
        };
      }

      const comment = await Comment.findByIdAndUpdate(
        commentId,
        { $inc: { likes: 1 } },
        { new: true }
      );

      if (!comment) {
        return {
          success: false,
          message: 'Comment not found'
        };
      }

      return {
        success: true,
        data: { likes: comment.likes },
        message: 'Comment liked successfully'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to like comment');
    }
  }

  // Utility Methods
  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}

export const blogService = new BlogService();