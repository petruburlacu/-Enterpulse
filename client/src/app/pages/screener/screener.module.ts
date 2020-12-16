import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenerRoutingModule } from './screener-routing.module';
import { ScreenerComponent } from './screener.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FinancialService } from '@core/services/financial.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  imports: [
    ScreenerRoutingModule,
    NzInputModule,
    FormsModule,
    NzCardModule,
    NzAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    NzButtonModule,
    NzDividerModule
  ],
  providers: [
    FinancialService
  ],
  declarations: [ScreenerComponent],
  exports: [ScreenerComponent]
})
export class ScreenerModule { }
