import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home',loadComponent:()=>import('./components/home/home.component').then(m=>m.HomeComponent)},
  {path:'**',loadComponent:()=>import('./components/home/home.component').then(m=>m.HomeComponent)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
