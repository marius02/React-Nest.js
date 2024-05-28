import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';

describe('UploadController', () => {
  let app: INestApplication;
  let uploadController: UploadController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    uploadController = moduleRef.get<UploadController>(UploadController);
  });

  it('should upload a file successfully', async () => {
    const filePath = path.join(__dirname, 'test-files', 'test.txt');
    const response = await request(app.getHttpServer())
      .post('/upload')
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