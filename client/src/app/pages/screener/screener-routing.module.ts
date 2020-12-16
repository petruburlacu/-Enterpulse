import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenerComponent } from './screener.component';

const routes: Routes = [
  { path: '', component: ScreenerComponent },
  { path: 'report/:ticker', loadChildren: () => import('../report/report.module').then(m => m.ReportModule), data: {title: 'Enterpulse', breadcrumb: 'Report'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenerRoutingModule { }
