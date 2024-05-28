import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { ExcelMngController } from './excelMngt.controller';
import { ExcelMngService } from './excel-mng.service';

describe('ExcelMngController', () => {
  let app: INestApplication;
  let excelMngController: ExcelMngController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ExcelMngController],
      providers: [ExcelMngService]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    excelMngController = moduleRef.get<ExcelMngController>(ExcelMngController);
  });

  it('should upload a file successfully', async () => {
    const filePath = path.join(__dirname, 'test-files', 'test.xlsx');
    const response = await request(app.getHttpServer())
    .post('/excelMng/upload')
    .attach('file', filePath);
    console.log("test")

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('filename');
    // Optionally, you can check if the file exists in the upload directory
    const uploadedFilePath = path.join(__dirname, '..', '..', 'storage', response.body.filename);
    expect(fs.existsSync(uploadedFilePath)).toBe(true);

    // Clean up the uploaded file after the test
    fs.unlinkSync(uploadedFilePath);
  });

});