import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { Problem } from './problem.interface';
import { ProblemDto } from './problem.dto';

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

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
