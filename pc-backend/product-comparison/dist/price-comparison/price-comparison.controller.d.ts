import { PriceComparisonService } from './price-comparison.service';
import { FileUploadService } from './file-upload/file-upload.service';
import { Response } from 'express';
export declare class PriceComparisonController {
    private priceComparisonService;
    private fileUploadService;
    constructor(priceComparisonService: PriceComparisonService, fileUploadService: FileUploadService);
    comparePrices(files: Express.Multer.File[]): Promise<{
        message: string;
        filePath: any;
    }>;
    swapPrices(files: Express.Multer.File[]): Promise<{
        message: string;
        filePath: any;
    }>;
    downloadFile(docName: string, res: Response): Promise<void>;
}
