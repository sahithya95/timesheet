import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent, DialogOverview ,Editdialog } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { MatFormFieldModule, MatButtonModule, MatDialogModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';


@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule,MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,FormsModule,MatOptionModule,MatSelectModule
    ],
    declarations: [TablesComponent,DialogOverview,Editdialog],
    entryComponents: [
        DialogOverview,Editdialog
    ]
})
export class TablesModule {}
