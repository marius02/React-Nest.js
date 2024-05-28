import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import { GetDataDto } from './get-data.dto';
import { ExcelMngService } from './excel-mng.service';

@Controller('excelMng')
export class ExcelMngController {

  constructor(private readonly excelMngService: ExcelMngService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, callback) => {
        // Generate a unique filename with a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Handle the uploaded file, e.g., return file info
    return {
      filename: basename(file.filename),
    };
  }

  @Get("readData")
  async getData(@Query() query: GetDataDto) {
    const { fileId, page, count, sort, sortIndex, searchText } = query;
    if (!fileId) {
      throw new Error('ID is required');
    }
    const data = await this.excelMngService.getData(fileId, page, count, sort, sortIndex, searchText);
    return data;
  }
}