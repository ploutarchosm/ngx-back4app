import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PageLayoutComponent} from "@shared/components/page-layout/page-layout.component";
import {SharedModule} from "@shared/shared.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgxsModule} from "@ngxs/store";


const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    title: 'Home',
    children: [{ path: '', component: DashboardComponent }],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxsModule,
    CommonModule,
  ]
})
export class DashboardModule { }
