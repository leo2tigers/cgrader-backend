import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemSchema, ProblemModel } from './problem.schema';
import { FileModule } from '../file/file.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProblemModel, schema: ProblemSchema },
        ]),
        FileModule,
    ],
    controllers: [ProblemController],
    providers: [ProblemService],
})
export class ProblemModule {}
