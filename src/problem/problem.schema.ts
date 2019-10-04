import { Schema } from 'mongoose';

export const ProblemModel = 'Problem';

export const ProblemSchema = new Schema({
    name: String,
    code: String,
    fileUrl: String,
});
