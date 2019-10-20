import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProblemModel } from './problem.schema';
import { Problem } from './problem.interface';
import { ProblemDto } from './problem.dto';
import { FileDto, FileDetail } from '../file/file.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProblemService {
    constructor(
        @InjectModel(ProblemModel) private readonly model: Model<Problem>,
        private readonly fileService: FileService,
    ) {}

    find(): Promise<Problem[]> {
        return this.model.find().exec();
    }

    findById(id: string): Promise<Problem> {
        return this.model.findById(id).exec();
    }

    findByCode(code: string): Promise<Problem> {
        return this.model.findOne({ code }).exec();
    }

    async getFileUrl(code: string): Promise<FileDetail> {
        try {
            return this.fileService.getFileUrl(`${code}/problem`);
        } catch {
            throw new NotFoundException('File not found');
        }
    }

    create(problemDto: ProblemDto): Promise<Problem> {
        const problem = new this.model(problemDto);
        return problem.save();
    }

    update(code: string, problemDto: Partial<ProblemDto>): Promise<Problem> {
        return this.model
            .findOneAndUpdate({ code }, problemDto, { new: true })
            .exec();
    }
    async uploadProblem(code: string, file: FileDto) {
        await this.fileService.uploadFile(`${code}/problem`, file);
    }

    async uploadTestCases(code: string, files: FileDto[]) {
        await Promise.all(
            files.map(file =>
                this.fileService.uploadFile(
                    `${code}/testcases/${file.originalname}`,
                    file,
                ),
            ),
        );
    }

    async delete(code: string) {
        this.fileService.deleteFolder(code);
        return this.model.findOneAndDelete({ code }).exec();
    }
}
