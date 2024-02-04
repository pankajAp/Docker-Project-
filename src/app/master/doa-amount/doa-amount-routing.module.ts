import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDoaAmountComponent} from './add-doa-amount/add-doa-amount.component';
import {AllDoaAmountsComponent} from './all-doa-amounts/all-doa-amounts.component';
import {EditDoaAmountComponent} from './edit-doa-amount/edit-doa-amount.component';

const routes: Routes = [
  {
    path: 'all-doa-amounts',
    component: AllDoaAmountsComponent
  },
  {
    path: 'add-doa-amount',
    component: AddDoaAmountComponent
  },
  {
    path: 'edit-doa-amount',
    component: EditDoaAmountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoaAmountRoutingModule {
}
