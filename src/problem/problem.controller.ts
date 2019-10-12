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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProblemService } from './problem.service';
import { Problem } from './problem.interface';
import { ProblemDto } from './problem.dto';
import { FileDto, FileDetail } from '../file/file.dto';
import { FileService } from '../file/file.service';
import { join } from 'path';
import { get } from 'http';

@Controller('problem')
export class ProblemController {
    constructor(
        private readonly service: ProblemService,
        private readonly fileService: FileService,
    ) {}

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
        return this.fileService.getFileUrl(id);
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
        FileInterceptor('file', { dest: join(__dirname, './upload') }),
    )
    async uploadProblem(
        @UploadedFile() file: FileDto,
        @Param('id') id: string,
    ) {
        if (file) {
            await this.fileService.uploadFile(id, file);
        } else {
            throw new BadRequestException('File not found');
        }
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
