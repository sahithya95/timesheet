import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'project', component: ProjectComponent },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            //{ path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
