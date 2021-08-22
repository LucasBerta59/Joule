import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CylinderComponent } from './cylinder.component';

const routes: Routes = [
  { path: '', component: CylinderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CylinderRoutingModule { }
