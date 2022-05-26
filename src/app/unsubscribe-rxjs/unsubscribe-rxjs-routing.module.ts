import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';

const routes: Routes = [
  {
    path: '', component: UnsubscribePocComponent
  }
];

@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes),

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class UnsubscribeRxjsRoutingModule { }
