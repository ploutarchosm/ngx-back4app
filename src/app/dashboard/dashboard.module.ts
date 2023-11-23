import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    title: '_i18n.Dashboard',
    children: [{ path: '', component: DashboardComponent }],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
