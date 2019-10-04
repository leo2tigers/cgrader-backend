import { Document } from 'mongoose';

export interface Problem extends Document {
    name: string;
    code: string;
    fileUrl: string;
}
