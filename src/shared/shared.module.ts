import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [PageLayoutComponent],
})
export class SharedModule {}
