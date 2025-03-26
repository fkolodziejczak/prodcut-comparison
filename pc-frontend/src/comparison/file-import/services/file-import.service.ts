import { Injectable, signal, WritableSignal } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DisplayFile } from '../domain/display-file.interface';

@Injectable()
export class FileImportService {
  public displayedFiles: WritableSignal<DisplayFile[] | null> = signal(null);
  private uploadedFiles: WritableSignal<File[]> = signal([]);

  public getFiles(): File[] {
    return this.uploadedFiles();
  }

  public onFileUpload(dropEntries: NgxFileDropEntry[]): void {
    dropEntries.forEach((entry: NgxFileDropEntry) => {
      const fileEntry = entry.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        if (
          !this.uploadedFiles().find(
            (uploadedFile: File) => uploadedFile.name === file.name,
          )
        ) {
          this.uploadedFiles.update((files: File[]) => [...files, file]);
        }
      });
    });
    this.__mapFiles();
  }

  public onSingleFileUpload(dropEntries: NgxFileDropEntry[]): void {
    this.uploadedFiles.set([]);
    dropEntries.forEach((entry: NgxFileDropEntry) => {
      const fileEntry = entry.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.uploadedFiles.update((files: File[]) => [...files, file]);
      });
    });
    this.__mapFiles();
  }

  public onFileDelete(removedFile: DisplayFile): void {
    this.uploadedFiles.set(
      this.uploadedFiles().filter(
        (file: File) => file.name !== removedFile.name,
      ),
    );

    this.__mapFiles();
  }

  private __mapFiles(): void {
    this.displayedFiles.set(
      this.uploadedFiles().map((file: File) => {
        return { name: file.name, size: file.size };
      }),
    );
  }
}
