import { Document } from 'mongoose';

export interface Problem extends Document {
    name: string;
    code: string;
    timeLimit: number;
    memLimit: number;
    fileUrl: string;
}
