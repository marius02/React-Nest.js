import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { ExcelMngController } from './excelMngt.controller';

describe('ExcelMngController', () => {
  let app: INestApplication;
  let excelMngController: ExcelMngController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ExcelMngController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    excelMngController = moduleRef.get<ExcelMngController>(ExcelMngController);
  });

  it('should upload a file successfully', async () => {
    const filePath = path.join(__dirname, 'test-files', 'test.txt');
    const response = await request(app.getHttpServer())
      .post('/excelMng/upload')
      .attach('file', filePath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('originalname');
    expect(response.body).toHaveProperty('filename');
    expect(response.body).toHaveProperty('path');

    // Optionally, you can check if the file exists in the upload directory
    const uploadedFilePath = path.join(__dirname, '..', '..', 'storage', response.body.filename);
    expect(fs.existsSync(uploadedFilePath)).toBe(true);

    // Clean up the uploaded file after the test
    fs.unlinkSync(uploadedFilePath);
  });

  afterAll(async () => {
    await app.close();
  });
});