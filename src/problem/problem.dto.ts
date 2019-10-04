import { IsString } from 'class-validator';

export class ProblemDto {
    @IsString()
    name: string;

    @IsString()
    code: string;
}
