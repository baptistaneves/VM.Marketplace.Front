import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';
import { GroupService } from './services/group.service';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { StateService } from './services/state.service';
import { CityService } from './services/city.service';
import { AddressService } from './services/address.service';
import { DeliveryAddressService } from './services/delivery-address.service';
import { UnitService } from './services/unit.service';
import { GroupsComponent } from './components/groups/groups.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { UnitsComponent } from './components/units/units.component';
import { StatesComponent } from './components/states/states.component';
import { CitiesComponent } from './components/cities/cities.component';
import { DeliveryAddressesComponent } from './components/delivery-addresses/delivery-addresses.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { GeneralRoutingModule } from './general.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralGuard } from './guards/general.guard';



@NgModule({
  declarations: [
    GroupsComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    UnitsComponent,
    AddressesComponent,
    DeliveryAddressesComponent,
    StatesComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GeneralRoutingModule,
    UiSwitchModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    GroupService,
    CategoryService,
    SubcategoryService,
    StateService,
    CityService,
    AddressService,
    DeliveryAddressService,
    UnitService,
    GeneralGuard
  ]
})
export class GeneralModule { }
