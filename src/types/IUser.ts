import { Types } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  name?: string;
  image?: string;
  phone?: string;
  biography?: string;
  role: 'user' | 'admin' | 'superAdmin';
  birthdayDate?: string;
  gender?: 'male' | 'female' | 'other';
  twitterProfile?: string;
  linkedinProfile?: string;
  posts?: [Types.ObjectId];
  favoritesCategory: [Types.ObjectId];
  favoritesPost: [Types.ObjectId];
  readingList: [Types.ObjectId];
  refreshToken: string;
};

export type IUpdateUser = {
  name?: string;
  image?: string;
  phone?: string;
  biography?: string;
  birthdayDate?: string;
  gender?: string;
  twitterProfile?: string;
  linkedinProfile?: string;
};
