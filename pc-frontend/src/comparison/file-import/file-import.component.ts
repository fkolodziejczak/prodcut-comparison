import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { FileListComponent } from './file-list/file-list.component';
import { DisplayFile } from './domain/display-file.interface';
import { FileImportService } from './services/file-import.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'product-comparison-file-import',
  imports: [NgxFileDropModule, FileListComponent, MatButton],
  standalone: true,
  templateUrl: './file-import.component.html',
  styleUrl: './file-import.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: FileImportService, useClass: FileImportService }],
})
export class FileImportComponent {
  private fileImportService = inject(FileImportService);
  public files: NgxFileDropEntry[] = [];
  public displayFiles: Signal<DisplayFile[] | null> =
    this.fileImportService.displayedFiles;
  public multiple = false;
  public fileImportMessage = 'Upuść pliki tutaj.';

  @Output()
  onFileAdd: EventEmitter<File[]> = new EventEmitter<File[]>();

  public dropped(files: NgxFileDropEntry[]): void {
    this.files = files;

    this.multiple
      ? this.fileImportService.onFileUpload(files)
      : this.fileImportService.onSingleFileUpload(files);
    this.onFileAdd.emit(this.fileImportService.getFiles());
  }

  public deleteFile(file: DisplayFile): void {
    this.fileImportService.onFileDelete(file);
  }
}
