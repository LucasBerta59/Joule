import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { CylinderRoutingModule } from './cylinder-routing.module';
import { CylinderComponent } from './cylinder.component';

@NgModule({
  declarations: [
    CylinderComponent,
  ],
  imports: [
    CommonModule,
    CylinderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    NgbActiveModal,
  ],
})
export class CylinderModule { }
