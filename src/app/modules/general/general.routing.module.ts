import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { UnitsComponent } from './components/units/units.component';
import { StatesComponent } from './components/states/states.component';
import { CitiesComponent } from './components/cities/cities.component';

const routes: Routes = [
  { 
    path: 'grupos', 
    component: GroupsComponent
  },
  { 
    path: 'categorias', 
    component: CategoriesComponent
  },
  { 
    path: 'subcategorias/:categoryDescription/:categoryId', 
    component: SubcategoriesComponent
  },
  { 
    path: 'unidades', 
    component: UnitsComponent
  },
  { 
    path: 'provincias', 
    component: StatesComponent
  },
  { 
    path: 'municipios/:stateName/:stateId', 
    component: CitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
