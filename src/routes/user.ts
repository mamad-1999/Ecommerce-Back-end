import express from 'express';
import {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  getPostsByUserId,
  deleteAccount,
  following,
} from '../controller/user';
import {
  saveReadingList,
  unSaveReadingList,
  getReadingLists,
} from '../controller/readingList';
import { favorites, unFavorites, getFavorites } from '../controller/favorites';
import verifyRole from '../middleware/verifyRole';
import verifyJWT from '../middleware/verifyJWT';

const route = express.Router();

// PUT => '/users/:id'
route.put('/:id', verifyJWT, updateUser);

// GET => '/users/:id'
route.get('/:id', verifyJWT, getUser);

// GET => '/users' /* admin */
route.get('/', verifyJWT, verifyRole('admin'), getUsers);

// DELETE => '/users/:id' /* admin */
route.delete('/:id', verifyJWT, verifyRole('admin'), deleteUser);

// POST => '/users/reading-list/:postId'
route.post('/reading-list/:postId', verifyJWT, saveReadingList);

// DELETE => '/users/reading-list/:postId'
route.delete('/reading-list/:postId', verifyJWT, unSaveReadingList);

// GET => '/users/reading-list/:uid'
route.get('/reading-list/:uid', verifyJWT, getReadingLists);

// POST => '/users/favorites'
route.post('/favorites', verifyJWT, favorites);

// DELETE => '/users/un-favorites'
route.post('/un-favorites', verifyJWT, unFavorites);

// GET => '/users/favorites/:uid'
route.get('/favorites/:uid', verifyJWT, getFavorites);

// GET => '/users/my-post/:uid'
route.get('/my-post/:uid', verifyJWT, getPostsByUserId);

// GET => '/users/following/:uid'
route.get('/following/:uid', verifyJWT, following);

// DELETE => '/users/delete-account'
route.delete('/delete-account/:uid', verifyJWT, deleteAccount);

export default route;
