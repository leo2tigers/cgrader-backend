import { Document } from 'mongoose';
import { UserRole } from './user.schema';

export interface User extends Document {
    role: UserRole;
}
