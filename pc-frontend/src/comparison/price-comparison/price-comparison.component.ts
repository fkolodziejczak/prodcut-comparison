import { Component, inject } from '@angular/core';
import { FileImportComponent } from '../file-import/file-import.component';
import { FileImportService } from '../file-import/services/file-import.service';
import { MatButton } from '@angular/material/button';
import { ComparePricesState } from '../state/compare-prices.state';
import { MultipleFilesDirective } from '../file-import/multiple-files.directive';
import { FileUploadMessageDirective } from '../file-import/file-upload-message.directive';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'product-comparison-price-comparison',
  imports: [
    FileImportComponent,
    MatButton,
    MultipleFilesDirective,
    FileUploadMessageDirective,
    MatCard,
    MatCardHeader,
    MatCardContent,
  ],
  standalone: true,
  providers: [FileImportService, ComparePricesState],
  templateUrl: './price-comparison.component.html',
  styleUrl: './price-comparison.component.scss',
})
export class PriceComparisonComponent {
  public offerFiles: File[] = [];
  public currentPricesFile: File[] = [];
  public selectedPriceFile: File[] = [];
  public currentPricesToSwapFile: File[] = [];
  private readonly priceComparisonState = inject(ComparePricesState);

  public offerFilesAdded(files: File[]): void {
    this.offerFiles = files;
  }

  public selectedProductFilesAdded(files: File[]): void {
    this.selectedPriceFile = files;
  }

  public currentPricesFileAdded(files: File[]): void {
    this.currentPricesFile = files;
  }

  public currentPricesToSwapFileAdded(files: File[]): void {
    this.currentPricesToSwapFile = files;
  }

  public onFilesSubmit(): void {
    this.priceComparisonState.comparePrices([
      ...this.offerFiles,
      ...this.currentPricesFile,
    ]);
  }

  public onSwapFilesSubmit(): void {
    this.priceComparisonState.swapProducts([
      ...this.selectedPriceFile,
      ...this.currentPricesToSwapFile,
    ]);
  }
}
