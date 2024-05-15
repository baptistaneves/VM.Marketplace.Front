import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ListRolesComponent } from './components/roles/list-roles/list-roles.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { EditRoleComponent } from './components/roles/edit-role/edit-role.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UsersComponent } from './components/users/users/users.component';


@NgModule({
  declarations: [
    ListRolesComponent,
    AddRoleComponent,
    EditRoleComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UiSwitchModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AccordionModule,
    TabsModule,
    ConfigurationRoutingModule,
  ]
})
export class ConfigurationModule { }
