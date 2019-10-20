import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { StarsModule } from '../../common/stars/stars.module';
import { SpinnerModule } from '../../common/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    StarsModule,
    RouterModule,
    SpinnerModule,
    MatProgressBarModule
  ],
  declarations: [ProductListComponent],
  exports: [ProductListComponent]
})
export class ProductListModule {}
