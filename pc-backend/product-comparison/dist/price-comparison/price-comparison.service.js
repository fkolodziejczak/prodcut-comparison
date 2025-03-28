"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceComparisonService = void 0;
const common_1 = require("@nestjs/common");
let PriceComparisonService = class PriceComparisonService {
    compareFiles(newOfferData, currentOfferData) {
        const mappedCurrentOfferData = this._mapCurrentOfferData(currentOfferData);
        const mappedNewOfferData = this._mapNewOfferData(newOfferData);
        const selectedNewOfferProducts = [];
        for (const product of mappedNewOfferData) {
            const currentProducts = mappedCurrentOfferData.filter((obj) => obj.ean === product.ean);
            if (currentProducts) {
                const cheaperProducts = currentProducts.filter((currProd) => currProd.purchasePrice > product.purchasePrice);
                if (cheaperProducts) {
                    const selectedProducts = cheaperProducts.map((cheaperProduct) => ({
                        nazwatow: cheaperProduct.nazwatow,
                        barkodtow: cheaperProduct.ean,
                        sklep: cheaperProduct.sklep,
                        'cena zak': cheaperProduct.purchasePrice,
                        'cena det': cheaperProduct['cena det'],
                        'stan poc ilo': cheaperProduct['stan poc ilo'],
                        'zakup ilo': cheaperProduct['zakup ilo'],
                        'sprzedaz ilo': cheaperProduct['sprzedaz ilo'],
                        'stan kon ilo': cheaperProduct['stan kon ilo'],
                        'data zakupu': cheaperProduct['data zakupu'],
                        'nowa cena': product.purchasePrice,
                    }));
                    selectedNewOfferProducts.push(...selectedProducts);
                }
            }
        }
        return selectedNewOfferProducts;
    }
    swapPrices(newPricesProducts, currentOfferData) {
        const newProductIndexes = [];
        const resultData = currentOfferData.map((currentProduct, index) => {
            const product = newPricesProducts.find((prod) => currentProduct.barkodtow === prod.barkodtow &&
                currentProduct.sklep === prod.sklep);
            if (product) {
                newProductIndexes.push(index);
                return { ...currentProduct, 'cena zak': product['nowa cena'] };
            }
            else {
                return currentProduct;
            }
        });
        return [resultData, newProductIndexes];
    }
    _mapCurrentOfferData(data) {
        data.forEach((obj) => {
            this.renameKey(obj, 'cena zak', 'purchasePrice');
            this.renameKey(obj, 'barkodtow', 'ean');
        });
        return data;
    }
    _mapNewOfferData(data) {
        data.forEach((obj) => {
            this.renameKey(obj, 'Aktualna Cena Sprzedaż PGS (netto) za opak. jednostkowe', 'purchasePrice');
            this.renameKey(obj, 'Kod EAN ', 'ean');
        });
        return data;
    }
    renameKey(obj, oldKey, newKey) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }
};
exports.PriceComparisonService = PriceComparisonService;
exports.PriceComparisonService = PriceComparisonService = __decorate([
    (0, common_1.Injectable)()
], PriceComparisonService);
//# sourceMappingURL=price-comparison.service.js.map