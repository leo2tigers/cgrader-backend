import { Schema } from 'mongoose';

export const ProblemModel = 'Problem';

export const ProblemSchema = new Schema({
    name: String,
    code: String,
    timeLimit: {
        type: Number,
        default: 1.0,
    },
    memLimit: {
        type: Number,
        default: 512,
    },
    fileUrl: String,
});
