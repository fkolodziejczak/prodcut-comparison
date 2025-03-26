import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackbar = inject(MatSnackBar);

  public displaySnackbar(message: string): void {
    console.log(message);
    this.snackbar.open(message, 'Close', {
      duration: 3000, // Duration of snackbar
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
