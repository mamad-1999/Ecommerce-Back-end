import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import verifyRole from '../middleware/verifyRole';
import { createAdmin, deleteAdmin, getAdmin, updateAdmin } from '../controller/admin';

const route = express.Router();

// PUT => '/admins/:id'
route.put('/:id', verifyJWT, verifyRole('admin'), updateAdmin);

// DELETE => '/admins/:id'
route.delete('/:id', verifyJWT, verifyRole('superAdmin'), deleteAdmin);

// POST => '/admins/:id'
route.post('/', verifyJWT, verifyRole('superAdmin'), createAdmin);

// GET => '/admins'
route.get('/', verifyJWT, verifyRole('superAdmin'));

// GET => '/admins/:aid'
route.get('/:aid', verifyJWT, verifyRole('admin'), getAdmin);

export default route;