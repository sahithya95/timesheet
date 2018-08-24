import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { PageHeaderModule } from './../../shared';
import { MatFormFieldModule, MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { DialogOverview ,Editdialog } from './project.component';


@NgModule({
    imports: [CommonModule, ProjectRoutingModule, PageHeaderModule,MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,FormsModule
    ],
    declarations: [DialogOverview,Editdialog],
    entryComponents: [
        DialogOverview,Editdialog
    ]
})
export class ProjectModule {}
