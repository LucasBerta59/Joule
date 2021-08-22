import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/cylinder', pathMatch: 'full' },
  { path: 'cylinder', loadChildren: () => import('./cylinder/cylinder.module').then(m => m.CylinderModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
