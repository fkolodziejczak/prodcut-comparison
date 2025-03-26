import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-comparison-validation-error',
  imports: [],
  standalone: true,
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss',
})
export class ValidationErrorComponent {
  @Input() message: string;
}
