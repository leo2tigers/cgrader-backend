import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemSchema, ProblemModel } from './problem.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProblemModel, schema: ProblemSchema },
        ]),
    ],
    controllers: [ProblemController],
    providers: [ProblemService],
})
export class ProblemModule {}
