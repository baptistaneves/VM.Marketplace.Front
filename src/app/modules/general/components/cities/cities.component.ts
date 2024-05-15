import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CreateCityRequest } from '../../models/cities/createCityRequest';
import { UpdateCityRequest } from '../../models/cities/UpdateCityRequest';
import { CityService } from '../../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { CityDto } from '../../models/cities/cityDto';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  cities: CityDto[];
  createCityResquest: CreateCityRequest;
  updateCityRequest: UpdateCityRequest;

  stateId: string;
  stateName: string;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  constructor(private fb: FormBuilder,
              private cityService: CityService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
        
      this.stateName = this.route.snapshot.params['stateName'];
      this.stateId = this.route.snapshot.params['stateId'];
  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Províncias' },
        { label: this.stateName },
        { label: 'Munícipios', active: true }
      ];

      this.listCities();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listCities() {
    this.cityService.getCitiesByStateId(this.stateId)
          .subscribe(
            response =>{
              this.cities = response.data;
              console.log(this.cities);
            },
            errors => { this.handleFail(errors); }
          )
  }

  initializeAddForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  initializeEditForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      id: ['']
    });
  }

  fillForm(city:CityDto) {
    this.editForm.patchValue({
      id: city.id,
      name: city.name
    });
  }

  get f(){return this.addForm.controls;}

  get e(){return this.editForm.controls;}
  
    /**
  * Confirmation mail model
  */
  deleteRecord() {
    if (this.checkedValGet.length > 0) {
      this.deleteModal?.show();
    } else {
      Swal.fire({ text: 'Por favor selecione pelo menos uma checkbox', confirmButtonColor: 'rgb(3, 142, 220)' });

    }
  }

  addCity() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createCityResquest = Object.assign({}, this.createCityResquest, this.addForm.value);

      this.createCityResquest.stateId = this.stateId;

      this.cityService.add(this.createCityResquest)
            .subscribe(
              sucesso => { this.handleSuccessAddCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editCity() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateCityRequest = Object.assign({}, this.updateCityRequest, this.editForm.value);
    
      this.updateCityRequest.stateId = this.stateId;
  
      this.cityService.update(this.updateCityRequest)
            .subscribe(
              sucesso => { this.handleSuccessEditCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove(id:string){
    this.cityService.remove(id)
    .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFail(erros) }
    );
   
  }
  
  handleSuccessAddCity() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Adicionado!', 
        text: 'O munícipio foi adicionado com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listCities();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  handleSuccessEditCity() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Actualizado!', 
        text: 'O munícipio foi actualizado com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listCities();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este munícipio será excluido. Desejá continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sim, Remover!',
      cancelButtonText: 'Não, cancelar!',
    }).then(result => {
      if (result.value) {
        this.remove(id);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Remoção do grupo cancelada :)',
          icon: 'info',
          confirmButtonColor: 'rgb(3, 142, 220)',
          confirmButtonText: 'Ok!',
        })
      }
    });
  }

  handleSuccessRemove() {
    Swal.fire({ 
      title: 'Removido!', 
      text: 'O munícipio foi removido com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listCities();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {}
    });
  }

  handleFail(fail: any) {
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}