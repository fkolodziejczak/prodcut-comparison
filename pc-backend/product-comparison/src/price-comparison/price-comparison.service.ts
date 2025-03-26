import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceComparisonService {
  public compareFiles(newOfferData: any[], currentOfferData: any[]) {
    const mappedCurrentOfferData: any[] =
      this._mapCurrentOfferData(currentOfferData);
    const mappedNewOfferData: any[] = this._mapNewOfferData(newOfferData);
    const selectedNewOfferProducts: any = [];

    for (const product of mappedNewOfferData) {
      const currentProducts: any[] = mappedCurrentOfferData.filter(
        (obj) => obj.ean === product.ean,
      );
      if (currentProducts) {
        const cheaperProducts = currentProducts.filter(
          (currProd) => currProd.purchasePrice > product.purchasePrice,
        );
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

  public swapPrices(newPricesProducts: any[], currentOfferData: any[]) {
    const newProductIndexes: number[] = [];
    const resultData = currentOfferData.map((currentProduct, index) => {
      const product = newPricesProducts.find(
        (prod) =>
          currentProduct.barkodtow === prod.barkodtow &&
          currentProduct.sklep === prod.sklep,
      );
      if (product) {
        newProductIndexes.push(index);
        return { ...currentProduct, 'cena zak': product['nowa cena'] };
      } else {
        return currentProduct;
      }
    });

    return [resultData, newProductIndexes];
  }

  private _mapCurrentOfferData(data: any) {
    data.forEach((obj) => {
      this.renameKey(obj, 'cena zak', 'purchasePrice');
      this.renameKey(obj, 'barkodtow', 'ean');
    });

    return data;
  }

  private _mapNewOfferData(data: any) {
    data.forEach((obj) => {
      this.renameKey(
        obj,
        'Aktualna Cena Sprzedaż PGS (netto) za opak. jednostkowe',
        'purchasePrice',
      );
      this.renameKey(obj, 'Kod EAN ', 'ean');
    });

    return data;
  }

  private renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}
