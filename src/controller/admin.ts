import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../model/User';
import checkUserData from '../validators/user';
import { IUpdateUser } from '../types/IUser';

export const updateAdmin = async (
  req: Request<{ id: string }, Record<string, never>, IUpdateUser, Record<string, never>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const foundAdmin = await User.findById(req.user)
      .select('-password -refreshToken')
      .exec();

    if (!foundAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (foundAdmin.role !== 'admin' && req.user?.toString() !== req.params.id) {
      return res
        .status(401)
        .json({ message: 'You are not Authorized to update this user' });
    }

    const checkData = await checkUserData({ ...req.body });
    if (checkData !== true) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const updatedAdmin = await User.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body },
    }).select('-password -refreshToken');

    if (!updateAdmin) {
      return res.status(500).json({ message: 'Something wrong... Try again' });
    }

    res.status(200).json({ message: 'Update admin successfully', data: updatedAdmin });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (
  req: Request<
    { id: string },
    Record<string, never>,
    Record<string, never>,
    Record<string, never>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const foundAdmin = await User.findById(req.params.id)
      .select('-password -refreshToken')
      .exec();

    if (!foundAdmin || foundAdmin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin not found' });
    }

    foundAdmin.role = 'user';
    await foundAdmin.save();

    res.status(200).json({ message: 'Admin deleted', data: foundAdmin });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    { email: string },
    Record<string, never>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newAdmin = await User.findOne({ email: req.body.email })
      .select('-password -refreshToken')
      .exec();

    if (!newAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (newAdmin && newAdmin.role === 'admin') {
      return res.status(400).json({ message: 'Admin already existed' });
    }

    newAdmin.role = 'admin';
    await newAdmin.save();

    res.status(200).json({ message: 'New admin created', data: newAdmin });
  } catch (error) {
    next(error);
  }
};

export const getAdmins = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    { page?: string; limit?: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pageNumber = parseInt(req.query.page || '1');
    const adminPerPage = parseInt(req.query.limit || '4');

    if (isNaN(pageNumber) || isNaN(adminPerPage)) {
      return res.status(400).json({ message: 'Page and limit must be numbers' });
    }

    const admins = await User.find({ role: 'admin' })
      .select('-password -refreshToken')
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * adminPerPage)
      .limit(adminPerPage);

    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.status(200).json({
      message: 'Get admins successfully',
      data: admins,
      totalPosts: totalAdmins,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previousPage: pageNumber - 1,
      hasNextPage: adminPerPage * pageNumber < totalAdmins,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalAdmins / adminPerPage),
    });
  } catch (error) {
    next(error);
  }
};
