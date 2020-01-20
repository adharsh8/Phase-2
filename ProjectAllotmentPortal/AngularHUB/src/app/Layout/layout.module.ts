import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatCardModule, MatButtonModule, MatSlideToggleModule, MatDividerModule, 
  MatSidenavModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { IgxAvatarModule } from 'igniteui-angular';
import { AvatarModule } from "ngx-avatar";



@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
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
        IgxAvatarModule,
        AvatarModule
    ],
    exports: [ 
      HeaderComponent,
      FooterComponent,
      NavbarComponent
    ],
    declarations: [
   
      HeaderComponent,
   
    ]
  })
  export class LayoutModule { }