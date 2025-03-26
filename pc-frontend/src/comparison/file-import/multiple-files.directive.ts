import { AfterContentInit, Directive, Host } from '@angular/core';
import { FileImportComponent } from './file-import.component';

@Directive({
  selector: '[productComparisonMultipleFiles]',
  standalone: true,
})
export class MultipleFilesDirective implements AfterContentInit {
  constructor(@Host() private fileImportComponent: FileImportComponent) {}

  public ngAfterContentInit(): void {
    this.fileImportComponent.multiple = true;
  }
}
