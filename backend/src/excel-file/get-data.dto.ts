import { IsString, IsOptional, IsNumber, } from 'class-validator';
export class GetDataDto {
    @IsString()
    fileId: string;

    @IsNumber()
    page: number;

    @IsNumber()
    count: number;

    @IsNumber()
    sort: number;

    @IsNumber()
    sortIndex: number;

    @IsString()
    @IsOptional()
    searchText: string;
}