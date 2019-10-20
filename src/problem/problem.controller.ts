import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProblemService } from './problem.service';
import { Problem } from './problem.interface';
import { ProblemDto } from './problem.dto';
import { FileDto, FileDetail } from '../file/file.dto';
import { join } from 'path';

@Controller('problem')
export class ProblemController {
    constructor(private readonly service: ProblemService) {}

    @Get()
    find(): Promise<Problem[]> {
        return this.service.find();
    }

    @Get(':code')
    findByCode(@Param('code') code: string): Promise<Problem> {
        return this.service.findByCode(code);
    }

    @Get(':code/file')
    getFileUrl(@Param('code') code: string): Promise<FileDetail> {
        return this.service.getFileUrl(code);
    }

    @Post()
    create(@Body() problemDto: ProblemDto): Promise<Problem> {
        return this.service.create(problemDto);
    }

    @Patch(':code')
    update(
        @Param('code') code: string,
        @Body() problemDto: Partial<ProblemDto>,
    ): Promise<Problem> {
        return this.service.update(code, problemDto);
    }

    @Patch(':code/file')
    @UseInterceptors(
        FileInterceptor('file', { dest: join(__dirname, '../../upload') }),
    )
    async uploadProblem(
        @UploadedFile() file: FileDto,
        @Param('code') code: string,
    ) {
        if (file) {
            await this.service.uploadProblem(code, file);
        } else {
            throw new BadRequestException('No files uploaded');
        }
    }

    @Patch(':code/testcase')
    @UseInterceptors(
        FilesInterceptor('files', 50, {
            dest: join(__dirname, '../../upload'),
        }),
    )
    async addTestCases(
        @UploadedFiles() files: FileDto[],
        @Param('code') code: string,
    ) {
        if (files.length > 0) {
            await this.service.uploadTestCases(code, files);
        } else {
            throw new BadRequestException('No files uploaded');
        }
    }

    @Delete(':code')
    delete(@Param('code') code: string) {
        return this.service.delete(code);
    }
}
