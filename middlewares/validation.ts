import { Request, Response, NextFunction } from 'express';

export const validateBlog = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, excerpt, author, category } = req.body;

  if (!title || !content || !excerpt || !author || !category) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: title, content, excerpt, author, category'
    });
  }

  if (title.length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Title must be at least 5 characters long'
    });
  }

  next();
};

export const validateComment = (req: Request, res: Response, next: NextFunction) => {
  const { content, blogId } = req.body;

  if (!content || !blogId) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: content, blogId'
    });
  }

  if (content.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Comment content cannot be empty'
    });
  }

  next();
};