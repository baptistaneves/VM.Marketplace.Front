import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Unit } from '../../models/units/unit';
import { CreateUnitRequest } from '../../models/units/createUnitRequest';
import { UpdateUnitRequest } from '../../models/units/UpdateUnitRequest';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  units: Unit[];
  createUnitRequest: CreateUnitRequest;
  updateUnitRequest: UpdateUnitRequest;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  constructor(private fb: FormBuilder,
              private unitService: UnitService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Unidades', active: true }
      ];

      this.listUnits();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listUnits() {
    this.unitService.getAll()
          .subscribe(
            response =>{
              this.units = response.data;
            },
            errors => { this.handleFail(errors); }
          )
  }

  initializeAddForm() {
    this.addForm = this.fb.group({
      description: ['', [Validators.required]]
    });
  }

  initializeEditForm() {
    this.editForm = this.fb.group({
      description: ['', [Validators.required]],
      id: ['']
    });
  }

  fillForm(unit:Unit) {
    this.editForm.patchValue({
      id: unit.id,
      description: unit.description
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

  addUnit() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createUnitRequest = Object.assign({}, this.createUnitRequest, this.addForm.value);

      this.unitService.add(this.createUnitRequest)
            .subscribe(
              sucesso => { this.handleSuccessAddCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editUnit() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateUnitRequest = Object.assign({}, this.updateUnitRequest, this.editForm.value);

      this.unitService.update(this.updateUnitRequest)
            .subscribe(
              sucesso => { this.handleSuccessEditCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove(id:string){
    this.unitService.remove(id)
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
        text: 'A unidade foi adicionada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listUnits();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  handleSuccessEditCity() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Actualizada!', 
        text: 'A unidade foi actualizada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listUnits();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta unidade será excluida. Desejá continuar?',
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
      text: 'A unidade foi removida com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listUnits();
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
