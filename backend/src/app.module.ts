import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelMngController } from './excel-file/excelMngt.controller';
import { ExcelMngModule } from './excel-file/excelMng.module';

@Module({
  imports: [ExcelMngModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
