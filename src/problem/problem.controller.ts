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

    @Get(':id')
    findById(@Param('id') id: string): Promise<Problem> {
        return this.service.findById(id);
    }

    @Get(':id/file')
    getFileUrl(@Param('id') id: string): Promise<FileDetail> {
        return this.service.getFileUrl(id);
    }

    @Post()
    create(@Body() problemDto: ProblemDto): Promise<Problem> {
        return this.service.create(problemDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() problemDto: Partial<ProblemDto>,
    ): Promise<Problem> {
        return this.service.update(id, problemDto);
    }

    @Patch(':id/file')
    @UseInterceptors(
        FileInterceptor('file', { dest: join(__dirname, '../../upload') }),
    )
    async uploadProblem(
        @UploadedFile() file: FileDto,
        @Param('id') id: string,
    ) {
        if (file) {
            await this.service.uploadProblem(id, file);
        } else {
            throw new BadRequestException('No files uploaded');
        }
    }

    @Patch(':id/testcase')
    @UseInterceptors(
        FilesInterceptor('files', 50, {
            dest: join(__dirname, '../../upload'),
        }),
    )
    async addTestCases(
        @UploadedFiles() files: FileDto[],
        @Param('id') id: string,
    ) {
        if (files.length > 0) {
            // gonna do something
        } else {
            throw new BadRequestException('No files uploaded');
        }
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
