import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProblemModel } from './problem.schema';
import { Problem } from './problem.interface';
import { ProblemDto } from './problem.dto';

@Injectable()
export class ProblemService {
    constructor(
        @InjectModel(ProblemModel) private readonly model: Model<Problem>,
    ) {}

    find(): Promise<Problem[]> {
        return this.model.find().exec();
    }

    findById(id: string): Promise<Problem> {
        return this.model.findById(id).exec();
    }

    create(problemDto: ProblemDto): Promise<Problem> {
        const problem = new this.model(problemDto);
        return problem.save();
    }

    update(id: string, problemDto: Partial<ProblemDto>): Promise<Problem> {
        return this.model
            .findByIdAndUpdate(id, problemDto, { new: true })
            .exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
