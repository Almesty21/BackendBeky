import { Router } from 'express';
import { blogController } from '../controllers/blogController';
import { validateBlog, validateComment } from '../middlewares/validation';

const router = Router();

// Blog routes
router.post('/', validateBlog, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', validateBlog, blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

// Comment routes
router.get('/:blogId/comments', blogController.getComments);
router.post('/comments', validateComment, blogController.createComment);

// Reaction routes
router.post('/:blogId/like', blogController.likeBlog);
router.post('/comments/:commentId/like', blogController.likeComment);

export { router as blogRoutes };