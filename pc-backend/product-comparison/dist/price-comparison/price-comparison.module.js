"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceComparisonModule = void 0;
const common_1 = require("@nestjs/common");
const price_comparison_service_1 = require("./price-comparison.service");
const price_comparison_controller_1 = require("./price-comparison.controller");
const file_upload_service_1 = require("./file-upload/file-upload.service");
let PriceComparisonModule = class PriceComparisonModule {
};
exports.PriceComparisonModule = PriceComparisonModule;
exports.PriceComparisonModule = PriceComparisonModule = __decorate([
    (0, common_1.Module)({
        providers: [price_comparison_service_1.PriceComparisonService, file_upload_service_1.FileUploadService],
        controllers: [price_comparison_controller_1.PriceComparisonController],
    })
], PriceComparisonModule);
//# sourceMappingURL=price-comparison.module.js.map