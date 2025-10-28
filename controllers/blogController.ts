import { Request, Response } from 'express';
import { blogService } from '../services/blogServices';

export class BlogController {
  async createBlog(req: Request, res: Response) {
    try {
      const result = await blogService.createBlog(req.body);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getBlogs(req: Request, res: Response) {
    try {
      const queryParams = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        category: req.query.category as string,
        search: req.query.search as string,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc'
      };

      const result = await blogService.getBlogs(queryParams);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await blogService.getBlogById(id);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await blogService.updateBlog(id, req.body);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await blogService.deleteBlog(id);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getComments(req: Request, res: Response) {
    try {
      const { blogId } = req.params;
      const result = await blogService.getComments(blogId);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async createComment(req: Request, res: Response) {
  try {
    console.log('Create comment request body:', req.body);
    
    const result = await blogService.createComment(req.body);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
  async likeBlog(req: Request, res: Response) {
    try {
      const { blogId } = req.params;
      const result = await blogService.likeBlog(blogId);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async likeComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const result = await blogService.likeComment(commentId);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export const blogController = new BlogController();