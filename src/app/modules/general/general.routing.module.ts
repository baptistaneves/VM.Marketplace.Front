import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { UnitsComponent } from './components/units/units.component';
import { StatesComponent } from './components/states/states.component';
import { CitiesComponent } from './components/cities/cities.component';
import { GeneralGuard } from './guards/general.guard';

const routes: Routes = [
  { 
    path: 'grupos', 
    component: GroupsComponent,
    canActivate: [GeneralGuard],
    data: [{ claim: { type: 'Grupo', value: 'Visualizar'}}]
  },
  { 
    path: 'categorias', 
    component: CategoriesComponent,
    canActivate: [GeneralGuard],
    data: [{ claim: { type: 'Categoria', value: 'Visualizar'}}]
  },
  { 
    path: 'subcategorias/:categoryDescription/:categoryId', 
    component: SubcategoriesComponent,
    canActivate: [GeneralGuard],
    data: [{ claim: { type: 'Subcategoria', value: 'Visualizar'}}]
  },
  { 
    path: 'unidades', 
    component: UnitsComponent,
    canActivate: [GeneralGuard],
    data: [{ claim: { type: 'Unidade', value: 'Visualizar'}}]
  },
  { 
    path: 'provincias', 
    component: StatesComponent,
    canActivate: [GeneralGuard],
    data: [{ claim: { type: 'Província', value: 'Visualizar'}}]
  },
  { 
    path: 'municipios/:stateName/:stateId', 
    component: CitiesComponent,
    canActivate: [GeneralGuard],
    data: [{ claim: { type: 'Munícipio', value: 'Visualizar'}}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
