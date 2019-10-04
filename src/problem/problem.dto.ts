import { IsString, IsPositive, IsOptional } from 'class-validator';

export class ProblemDto {
    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsOptional()
    @IsPositive()
    timeLimit: number;

    @IsOptional()
    @IsPositive()
    memLimit: number;
}
