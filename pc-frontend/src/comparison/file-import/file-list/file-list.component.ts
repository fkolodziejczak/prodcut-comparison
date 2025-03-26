import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { DisplayFile } from '../domain/display-file.interface';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FileSizePipe } from './file-size.pipe';

@Component({
  selector: 'product-comparison-file-list',
  imports: [NgForOf, MatIcon, NgIf, MatIconButton, FileSizePipe],
  standalone: true,
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  @Input() fileList: DisplayFile[] | null | undefined;
  @Output() onFileDelete: EventEmitter<DisplayFile> =
    new EventEmitter<DisplayFile>();

  deleteFile(file: DisplayFile): void {
    this.onFileDelete.emit(file);
  }
}
