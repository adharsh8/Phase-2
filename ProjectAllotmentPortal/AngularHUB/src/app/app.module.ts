import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule, MatFormFieldModule, 
  MatInputModule, MatCardModule, MatButtonModule, MatSlideToggleModule, MatTableDataSource,
   MatTableModule, MatCheckboxModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule,
    MatDatepicker, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HRdashboardComponent } from './hrdashboard/hrdashboard.component';
import{HRDashboardModule} from './hrdashboard/hrdashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { ModalComponent } from './hrdashboard/modal/modal.component';
import { StreamComponent } from './stream/stream.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { DisplayprojectComponent } from './displayproject/displayproject.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { StatusModalComponent } from './project/status-modal/status-modal.component';
import { ChartComponent } from './chart/chart.component';
import { FieldErrorDisplayModule } from './field-error-display/field-error-display.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HRdashboardComponent,
    NavbarComponent,
    ModalComponent,
    StreamComponent,
    NavbarComponent,
    AddprojectComponent,
    DisplayprojectComponent,
    ProjectComponent,
    LoginComponent,
    WelcomepageComponent,
    StatusModalComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    RouterModule.forRoot([]),
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule, 
    ReactiveFormsModule,
    A11yModule,
    BrowserAnimationsModule,
    HRDashboardModule,
    MatTableModule,
    HttpClientModule,
    MatCheckboxModule,
    HttpClientModule,MatDialogModule,
    MatDatepickerModule, MatNativeDateModule,
    MatFormFieldModule,
    FieldErrorDisplayModule, 
    MatSnackBarModule,


  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    MatDialogModule,AuthGuard,    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent,StatusModalComponent]
})
export class AppModule { }
