import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PriceComparisonService } from './price-comparison.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload/file-upload.service';
import { Response } from 'express';
import * as path from 'node:path';

@Controller('price-comparison')
export class PriceComparisonController {
  constructor(
    private priceComparisonService: PriceComparisonService,
    private fileUploadService: FileUploadService,
  ) {}

  @Post('comparePrices')
  @UseInterceptors(FilesInterceptor('files', 2))
  async comparePrices(@UploadedFiles() files: Express.Multer.File[]) {
    const newOfferData: any[] = this.fileUploadService.parseExcel(files[0]);
    const currentOfferData: any[] = this.fileUploadService.parseExcel(files[1]);

    const data = this.priceComparisonService.compareFiles(
      newOfferData,
      currentOfferData,
    );

    const filePath = this.fileUploadService.exportComparisonExcelFiles(data);

    return { message: 'Wygenerowano zamówienie pomyślnie.', filePath };
  }

  @Post('swapPrices')
  @UseInterceptors(FilesInterceptor('files', 2))
  async swapPrices(@UploadedFiles() files: Express.Multer.File[]) {
    const newPricesProducts: any[] = this.fileUploadService.parseExcel(
      files[0],
    );
    const currentOfferData: any[] = this.fileUploadService.parseExcel(files[1]);

    const data = this.priceComparisonService.swapPrices(
      newPricesProducts,
      currentOfferData,
    );

    const filePath = this.fileUploadService.exportSwappedProductExcelFile(data);

    return { message: 'Wygenerowano zamówienie pomyślnie.', filePath };
  }

  @Get('download/:docName')
  async downloadFile(@Param('docName') docName: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'public', `${docName}.xlsx`);

    res.download(filePath, `${docName}.xlsx`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error downloading file.');
      }
    });
  }
}
