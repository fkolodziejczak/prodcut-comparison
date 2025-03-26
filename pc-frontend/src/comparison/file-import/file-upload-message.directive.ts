import { AfterContentInit, Directive, Host, Input } from '@angular/core';
import { FileImportComponent } from './file-import.component';

@Directive({
  selector: '[productComparisonFileUploadMessage]',
  standalone: true,
})
export class FileUploadMessageDirective implements AfterContentInit {
  @Input()
  fileImportMessage = '';

  constructor(@Host() private fileImportComponent: FileImportComponent) {}

  public ngAfterContentInit() {
    this.fileImportComponent.fileImportMessage = this.fileImportMessage;
  }
}
