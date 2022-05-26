import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent,
   // ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
