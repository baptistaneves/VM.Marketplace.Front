import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { IndexComponent } from './index/index.component';
import { DashboardGuard } from './guards/dashboard.guard';


const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [DashboardGuard],
    data: [{ claim: { type: 'Dashboard', value: 'Visualizar'}}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
