import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRolesComponent } from './components/roles/list-roles/list-roles.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { EditRoleComponent } from './components/roles/edit-role/edit-role.component';
import { UsersComponent } from './components/users/users/users.component';
import { RoleResolver } from '../general/resolvers/role.resolver';

const routes: Routes = [
  { 
    path: 'niveis-de-acesso', 
    component: ListRolesComponent
  },
  { 
    path: 'adicionar-perfil', 
    component: AddRoleComponent
  },
  { 
    path: 'editar-perfil/:id', 
    component: EditRoleComponent,
    resolve: {
      role: RoleResolver
    }
  },
  { 
    path: 'utilizadores', 
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
