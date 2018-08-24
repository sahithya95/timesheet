import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DialogOverview,Editdialog } from './dashboard.component';
import { PageHeaderModule } from '../../shared';
import { MatFormFieldModule, MatButtonModule, MatDialogModule, MatInputModule,MatOptionModule,MatSelectModule, MatRadioModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        PageHeaderModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,MatOptionModule,MatSelectModule,
        FormsModule,MatRadioModule
    ],
    declarations: [
        DashboardComponent,
        DialogOverview,
        Editdialog
    ],
    entryComponents: [
        DialogOverview,Editdialog
    ]
})
export class DashboardModule {}
