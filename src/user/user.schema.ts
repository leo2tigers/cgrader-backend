import { Schema } from 'mongoose';

export const UserModel = 'User';

export enum UserRole {
    Student = 'Student',
    Admin = 'Admin',
}

export const UserSchema = new Schema({
    role: {
        type: String,
        enum: Object.keys(UserRole),
        default: UserRole.Student,
    },
});
