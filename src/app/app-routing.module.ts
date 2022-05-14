import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OwnerListComponent} from "./owner-list/owner-list.component";
import {NewOwnerComponent} from "./new-owner/new-owner.component";

const routes: Routes = [
  {
    path: '',
    component: OwnerListComponent
  },
  {
    path: 'new',
    component: NewOwnerComponent
  },
  {
    path: 'new/:id',
    component: NewOwnerComponent
  },
  {
    path: 'new/:id/:type',
    component: NewOwnerComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
