"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceComparisonController = void 0;
const common_1 = require("@nestjs/common");
const price_comparison_service_1 = require("./price-comparison.service");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("./file-upload/file-upload.service");
const path = require("node:path");
let PriceComparisonController = class PriceComparisonController {
    constructor(priceComparisonService, fileUploadService) {
        this.priceComparisonService = priceComparisonService;
        this.fileUploadService = fileUploadService;
    }
    async comparePrices(files) {
        const newOfferData = this.fileUploadService.parseExcel(files[0]);
        const currentOfferData = this.fileUploadService.parseExcel(files[1]);
        const data = this.priceComparisonService.compareFiles(newOfferData, currentOfferData);
        const filePath = this.fileUploadService.exportComparisonExcelFiles(data);
        return { message: 'Wygenerowano zamówienie pomyślnie.', filePath };
    }
    async swapPrices(files) {
        const newPricesProducts = this.fileUploadService.parseExcel(files[0]);
        const currentOfferData = this.fileUploadService.parseExcel(files[1]);
        const data = this.priceComparisonService.swapPrices(newPricesProducts, currentOfferData);
        const filePath = this.fileUploadService.exportSwappedProductExcelFile(data);
        return { message: 'Wygenerowano zamówienie pomyślnie.', filePath };
    }
    async downloadFile(docName, res) {
        const filePath = path.join(process.cwd(), 'public', `${docName}.xlsx`);
        res.download(filePath, `${docName}.xlsx`, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error downloading file.');
            }
        });
    }
};
exports.PriceComparisonController = PriceComparisonController;
__decorate([
    (0, common_1.Post)('comparePrices'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PriceComparisonController.prototype, "comparePrices", null);
__decorate([
    (0, common_1.Post)('swapPrices'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PriceComparisonController.prototype, "swapPrices", null);
__decorate([
    (0, common_1.Get)('download/:docName'),
    __param(0, (0, common_1.Param)('docName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PriceComparisonController.prototype, "downloadFile", null);
exports.PriceComparisonController = PriceComparisonController = __decorate([
    (0, common_1.Controller)('price-comparison'),
    __metadata("design:paramtypes", [price_comparison_service_1.PriceComparisonService,
        file_upload_service_1.FileUploadService])
], PriceComparisonController);
//# sourceMappingURL=price-comparison.controller.js.map