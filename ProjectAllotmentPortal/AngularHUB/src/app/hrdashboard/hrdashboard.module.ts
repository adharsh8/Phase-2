import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
    
    
  ]
})
export class HRDashboardModule { }