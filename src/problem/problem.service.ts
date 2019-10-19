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

    async getFileUrl(id: string): Promise<FileDetail> {
        const problem = await this.findById(id);
        try {
            return this.fileService.getFileUrl(`${problem.code}/problem`);
        } catch (_) {
            throw new NotFoundException('File not found');
        }
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
    async uploadProblem(id: string, file: FileDto) {
        const problem = await this.findById(id);
        await this.fileService.uploadFile(`${problem.code}/problem`, file);
    }

    async uploadTestCases(id: string, files: FileDto[]) {
        const problem = await this.findById(id);
        await Promise.all(
            files.map(file =>
                this.fileService.uploadFile(
                    `${problem.code}/testcases/${file.originalname}`,
                    file,
                ),
            ),
        );
    }

    async delete(id: string) {
        const problem = await this.findById(id);
        this.fileService.deleteFolder(problem.code);
        return this.model.findByIdAndDelete(id).exec();
    }
}
