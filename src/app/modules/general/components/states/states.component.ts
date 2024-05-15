import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UpdateCityRequest } from '../../models/cities/UpdateCityRequest';
import { CreateCityRequest } from '../../models/cities/createCityRequest';
import { CityService } from '../../services/city.service';
import { State } from '../../models/states/state';
import { StateService } from '../../services/state.service';
import { CreateStateRequest } from '../../models/states/createStateRequest';
import { UpdateStateRequest } from '../../models/states/UpdateStateRequest';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrl: './states.component.scss'
})
export class StatesComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  states: State[];
  createStateRequest: CreateStateRequest;
  updateStateRequest: UpdateStateRequest;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  constructor(private fb: FormBuilder,
              private stateService: StateService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Províncias', active: true }
      ];

      this.listStates();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listStates() {
    this.stateService.getAll()
          .subscribe(
            response =>{
              this.states = response.data;
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

  fillForm(state:State) {
    this.editForm.patchValue({
      id: state.id,
      name: state.name
    });
  }

  get f(){return this.addForm.controls;}

  get e() {return this.editForm.controls;}
  
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

  addState() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createStateRequest = Object.assign({}, this.createStateRequest, this.addForm.value);

      this.stateService.add(this.createStateRequest)
            .subscribe(
              sucesso => { this.handleSuccessAddCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editState() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateStateRequest = Object.assign({}, this.updateStateRequest, this.editForm.value);

      this.stateService.update(this.updateStateRequest)
            .subscribe(
              sucesso => { this.handleSuccessEditCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove(id:string){
    this.stateService.remove(id)
    .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFail(erros) }
    );
   
  }
  
  handleSuccessAddCity() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Adicionada!', 
        text: 'A província foi adicionada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listStates();
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
        text: 'A província foi actualizada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listStates();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta província será excluida. Desejá continuar?',
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
          text: 'Remoção da província cancelada :)',
          icon: 'info',
          confirmButtonColor: 'rgb(3, 142, 220)',
          confirmButtonText: 'Ok!',
        })
      }
    });
  }

  handleSuccessRemove() {
    Swal.fire({ 
      title: 'Removida!', 
      text: 'A província foi removida com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listStates();
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
