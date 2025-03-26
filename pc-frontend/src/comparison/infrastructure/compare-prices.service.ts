import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComparePricesService {
  public readonly endpoints = {
    comparePrices: `http://localhost:3003/price-comparison/comparePrices`,
    downloadComparison: `http://localhost:3003/price-comparison/download`,
    swapPrices: `http://localhost:3003/price-comparison/swapPrices`,
  };
  private http = inject(HttpClient);

  public comparePrices(files: File[]): Observable<any> {
    return this.http.post<any>(
      this.endpoints.comparePrices,
      this.__mapRequest(files),
    );
  }

  public swapPrices(files: File[]): Observable<any> {
    return this.http.post<any>(
      this.endpoints.swapPrices,
      this.__mapRequest(files),
    );
  }

  public downloadComparison(docName: string): Observable<Blob> {
    return this.http.get(this.endpoints.downloadComparison + `/${docName}`, {
      responseType: 'blob',
    });
  }

  private __mapRequest(files: File[]): FormData {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('files', file, file.name);
    });

    return formData;
  }
}
