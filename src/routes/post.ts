import express from 'express';
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
} from '../controller/post';
import verifyJWT from '../middleware/verifyJWT';
import { uploadImage } from '../utils/multer';
import sharpTransform from '../middleware/sharpTransform';
import handleMulterError from '../middleware/handleMulterError';

const route = express.Router();

// POST => '/posts'
route.post(
  '/',
  verifyJWT,
  uploadImage.single('image'),
  sharpTransform,
  handleMulterError,
  createPost,
);

// DELETE => '/posts/:id'
route.delete('/:id', verifyJWT, deletePost);

// PUT => '/posts/:id'
route.put('/:id', verifyJWT, updatePost);

// GET => '/posts/:id'
route.get('/:id', getPost);

// GET => '/posts'
route.get('/', getPosts);

export default route;
