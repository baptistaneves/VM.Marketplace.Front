import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { LayoutComponent } from './layouts/layout.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]  },
  { path: 'autenticar', component: AuthlayoutComponent, loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'geral', component: LayoutComponent, loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule) },
  { path: 'configuracao', component: LayoutComponent, loadChildren: () => import('./modules/configuration/configuration.module').then(m => m.ConfigurationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
