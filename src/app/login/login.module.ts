import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatButtonModule, MatDialogModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, LoginRoutingModule,MatFormFieldModule,
        MatDialogModule,MatButtonModule,MatOptionModule,
        MatInputModule,MatSelectModule,FormsModule,ReactiveFormsModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
