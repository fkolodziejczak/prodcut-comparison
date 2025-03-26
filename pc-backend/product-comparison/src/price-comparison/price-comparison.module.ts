import { Module } from '@nestjs/common';
import { PriceComparisonService } from './price-comparison.service';
import { PriceComparisonController } from './price-comparison.controller';
import { FileUploadService } from './file-upload/file-upload.service';

@Module({
  providers: [PriceComparisonService, FileUploadService],
  controllers: [PriceComparisonController],
})
export class PriceComparisonModule {}
