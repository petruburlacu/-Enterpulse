import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent, data: {title: 'Enterpulse', breadcrumb: 'Home'} },
  { path: '**', component: AppComponent, data: {title: 'Enterpulse', breadcrumb: 'Wondering'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
