import { Module } from '@nestjs/common';
import { FileUploadService } from './price-comparison/file-upload/file-upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PriceComparisonModule } from './price-comparison/price-comparison.module';

@Module({
  imports: [
    PriceComparisonModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), // Adjust path as needed
    }),
  ],
  controllers: [],
  providers: [FileUploadService],
})
export class AppModule {}
