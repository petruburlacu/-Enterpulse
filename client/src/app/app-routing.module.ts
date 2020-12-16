import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/screener' },
  { path: 'screener', loadChildren: () => import('./pages/screener/screener.module').then(m => m.ScreenerModule), data: {title: 'Enterpulse', breadcrumb: 'Screener'} },
  { path: '**', redirectTo: '/screener' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
