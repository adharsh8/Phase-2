import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HRdashboardComponent } from './hrdashboard/hrdashboard.component';
import { StreamComponent } from './stream/stream.component';
import { ProjectComponent } from './project/project.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { DisplayprojectComponent } from './displayproject/displayproject.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ChartComponent } from './chart/chart.component';




const routes: Routes = [
  { path: 'hrdashboard', component:HRdashboardComponent},
  { path : 'welcomepage', component : WelcomepageComponent,canActivate:[AuthGuard] },
  { path: 'stream', component:StreamComponent  },
  { path: 'project', component: ProjectComponent},
  { path : 'add-project', component: AddprojectComponent},
  { path: 'display-project', component : DisplayprojectComponent},
  {path : 'login', component : LoginComponent},
  { path : 'chart', component : ChartComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
