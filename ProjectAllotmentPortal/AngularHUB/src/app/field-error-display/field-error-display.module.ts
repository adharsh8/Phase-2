import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorDisplayComponent } from './field-error-display.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FieldErrorDisplayComponent],
  declarations: [FieldErrorDisplayComponent],
})
export class FieldErrorDisplayModule { }
