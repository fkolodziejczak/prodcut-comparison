"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx-js-style");
let FileUploadService = class FileUploadService {
    constructor() {
        this.border = {
            top: {
                style: 'thin',
                color: {
                    auto: 1,
                },
            },
            bottom: {
                style: 'thin',
                color: {
                    auto: 1,
                },
            },
            left: {
                style: 'thin',
                color: {
                    auto: 1,
                },
            },
            right: {
                style: 'thin',
                color: {
                    auto: 1,
                },
            },
        };
    }
    parseExcel(file) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = rawData[0];
        const data = rawData.slice(1).map((row) => {
            const rowData = {};
            row.map((cell, index) => {
                rowData[headers[index]] = cell;
            });
            return rowData;
        });
        return data.filter((row) => Object.keys(row).length !== 0);
    }
    exportSwappedProductExcelFile(data) {
        const [productData, productIndexed] = data;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(productData);
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let row = range.s.r; row <= range.e.r; row++) {
            const rowData = [];
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cell_address = { r: row, c: col };
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                const cell = ws[cell_ref];
                rowData.push(cell);
            }
            if (productIndexed.includes(row) && row != 0) {
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cell_address = { r: row, c: col };
                    const cell_ref = XLSX.utils.encode_cell(cell_address);
                    const cell = ws[cell_ref] || {};
                    cell.s = {
                        fill: {
                            fgColor: { rgb: 'FFFF80' },
                        },
                        alignment: {
                            horizontal: 'left',
                        },
                        border: this.border,
                    };
                    ws[cell_ref] = cell;
                }
            }
            else {
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cell_address = { r: row, c: col };
                    const cell_ref = XLSX.utils.encode_cell(cell_address);
                    const cell = ws[cell_ref] || {};
                    cell.s = {
                        alignment: {
                            horizontal: 'left',
                        },
                    };
                    ws[cell_ref] = cell;
                }
            }
        }
        const colWidths = [
            { wpx: 250 },
            { wpx: 100 },
            { wpx: 110 },
            { wpx: 70 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 80 },
            { wpx: 70 },
        ];
        if (!ws['!rows'])
            ws['!rows'] = [];
        ws['!rows'][0] = { hpx: 30 };
        ws['!cols'] = colWidths;
        XLSX.utils.book_append_sheet(wb, ws, 'Baza produktów PGS');
        const fs = require('fs');
        const path = require('path');
        const publicDir = path.join(process.cwd(), 'public');
        const filePath = path.join(publicDir, 'baza_pgs.xlsx');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        XLSX.writeFile(wb, filePath);
        return filePath;
    }
    exportComparisonExcelFiles(data) {
        const wb_PGS = XLSX.utils.book_new();
        const ws_cheaperCurrentOffer = XLSX.utils.json_to_sheet(data);
        const range = XLSX.utils.decode_range(ws_cheaperCurrentOffer['!ref']);
        for (let row = range.s.r; row <= range.e.r; row++) {
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cell_address = { r: row, c: col };
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if (cell_address.r === 0) {
                    ws_cheaperCurrentOffer[cell_ref].s = {
                        font: {
                            bold: true,
                        },
                        alignment: {
                            horizontal: 'center',
                            vertical: 'center',
                        },
                        border: this.border,
                    };
                }
                ws_cheaperCurrentOffer[cell_ref].s = {
                    alignment: {
                        horizontal: 'left',
                    },
                };
                if ((cell_address.c === 3 || cell_address.c === 10) &&
                    cell_address.r > 0) {
                    ws_cheaperCurrentOffer[cell_ref].s = {
                        fill: {
                            fgColor: { rgb: 'FFFF80' },
                        },
                        alignment: {
                            horizontal: 'left',
                        },
                        border: this.border,
                    };
                }
            }
        }
        const colWidths = [
            { wpx: 250 },
            { wpx: 100 },
            { wpx: 110 },
            { wpx: 70 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 65 },
            { wpx: 80 },
            { wpx: 70 },
        ];
        if (!ws_cheaperCurrentOffer['!rows'])
            ws_cheaperCurrentOffer['!rows'] = [];
        ws_cheaperCurrentOffer['!rows'][0] = { hpx: 30 };
        ws_cheaperCurrentOffer['!cols'] = colWidths;
        XLSX.utils.book_append_sheet(wb_PGS, ws_cheaperCurrentOffer, 'Oferta PGS');
        const fs = require('fs');
        const path = require('path');
        const publicDir = path.join(process.cwd(), 'public');
        const filePath = path.join(publicDir, 'porownanie.xlsx');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        XLSX.writeFile(wb_PGS, filePath);
        return filePath;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map