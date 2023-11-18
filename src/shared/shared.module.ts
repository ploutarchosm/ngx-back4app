import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { RouterModule } from '@angular/router';
import {
  AppFaRegularChartWaterfallComponent,
  AppFaRegularGaugeComponent,
} from '@shared/icons';
import { PageSidebarComponent } from './components/page-sidebar/page-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

const IconList = [
  AppFaRegularChartWaterfallComponent,
  AppFaRegularGaugeComponent,
];

@NgModule({
  declarations: [PageLayoutComponent, IconList, PageSidebarComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [PageLayoutComponent, IconList, PageSidebarComponent],
})
export class SharedModule {}
