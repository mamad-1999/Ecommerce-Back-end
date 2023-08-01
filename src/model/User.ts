import mongoose from "mongoose";
import { IUser } from "../types/IUser";

const userModel = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 30
    },
    image: { type: String },
    biography: {
        type: String,
        maxlength: 255,
    },
    gender: { type: String },
    phone: {
        type: String, 
        minlength: 10
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superAdmin'],
        default: 'user'
    },
    birthdayDate: {
        type: String
    },
    linkedinProfile: { type: String },
    twitterProfile: { type: String },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    savePost: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    refreshToken: { type: String }
},
    { timestamps: true },
);

export default mongoose.model<IUser>('User', userModel);
