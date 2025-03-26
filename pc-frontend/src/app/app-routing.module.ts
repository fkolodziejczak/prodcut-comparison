import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../comparison/price-comparison/price-comparison.component').then(
        (m) => m.PriceComparisonComponent,
      ),
    title: 'Porównanie Cenników',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
