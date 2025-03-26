import { inject, Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { ComparePricesService } from '../infrastructure/compare-prices.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { formatDate } from '@angular/common';
import { NotificationService } from '../../util/notification-service/notification.service';

type CompareState = { files: File[]; isLoading: boolean };

const initialOrderState: CompareState = {
  files: [],
  isLoading: false,
};

const swapState: CompareState = {
  files: [],
  isLoading: false,
};

@Injectable()
export class ComparePricesState {
  readonly #comparePricesState = signalState(initialOrderState);
  readonly #swapProductssState = signalState(swapState);
  readonly #comparePricesService = inject(ComparePricesService);
  readonly #notificationService = inject(NotificationService);

  public readonly comparePrices = rxMethod<any>(
    pipe(
      tap(() => patchState(this.#comparePricesState, { isLoading: true })),
      exhaustMap((files: File[]) => {
        return this.#comparePricesService.comparePrices(files).pipe(
          tapResponse({
            next: (response: any) => {
              this.#comparePricesService
                .downloadComparison('porownanie')
                .subscribe((blob) => {
                  const datetime = Date.now();
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download =
                    'porownanie' +
                    formatDate(datetime, '_d-MM-y_h-mm-ss', 'pl-PL') +
                    '.xlsx';
                  link.click();
                  window.URL.revokeObjectURL(url);
                });
              this.#notificationService.displaySnackbar(response.message);
            },
            error: (error: any) =>
              this.#notificationService.displaySnackbar(error.error.message),
            finalize: () =>
              patchState(this.#comparePricesState, { isLoading: false }),
          }),
        );
      }),
    ),
  );

  public readonly swapProducts = rxMethod<any>(
    pipe(
      tap(() => patchState(this.#swapProductssState, { isLoading: true })),
      exhaustMap((files: File[]) => {
        return this.#comparePricesService.swapPrices(files).pipe(
          tapResponse({
            next: (response: any) => {
              this.#comparePricesService
                .downloadComparison('baza_pgs')
                .subscribe((blob) => {
                  const datetime = Date.now();
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download =
                    'ceny-pgs' +
                    formatDate(datetime, '_d-MM-y_h-mm-ss', 'pl-PL') +
                    '.xlsx';
                  link.click();
                  window.URL.revokeObjectURL(url);
                });
              this.#notificationService.displaySnackbar(response.message);
            },
            error: (error: any) =>
              this.#notificationService.displaySnackbar(error.error.message),
            finalize: () =>
              patchState(this.#swapProductssState, { isLoading: false }),
          }),
        );
      }),
    ),
  );
}
