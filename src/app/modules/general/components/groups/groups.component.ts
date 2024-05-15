import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../models/groups/groups';
import { CreateGroupRequest } from '../../models/groups/createGroupRequest';
import { UpdateGroupRequest } from '../../models/groups/updateGroupRequest';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  groups: Group[];
  createGroupResquest: CreateGroupRequest;
  updateGroupRequest: UpdateGroupRequest;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  constructor(private fb: FormBuilder,
              private groupService: GroupService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Grupos', active: true }
      ];

      this.listGroups();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listGroups() {
    this.groupService.getAll()
          .subscribe(
            response =>{
              this.groups = response.data;
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

  fillForm(group:Group) {
    this.editForm.patchValue({
      id: group.id,
      description: group.description
    });
  }

  get f(){return this.addForm.controls;}
  
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

  addGroup() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createGroupResquest = Object.assign({}, this.createGroupResquest, this.addForm.value);

      this.groupService.add(this.createGroupResquest)
            .subscribe(
              sucesso => { this.handleSuccessAddGroup() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editGroup() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateGroupRequest = Object.assign({}, this.updateGroupRequest, this.editForm.value);

      this.groupService.update(this.updateGroupRequest)
            .subscribe(
              sucesso => { this.handleSuccessEditGroup() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove(id:string){
    this.groupService.remove(id)
    .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFail(erros) }
    );
   
  }
  
  handleSuccessAddGroup() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Adicionado!', 
        text: 'O grupo foi adicionado com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listGroups();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  handleSuccessEditGroup() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Actualizado!', 
        text: 'O grupo foi actualizado com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listGroups();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este grupo será excluido. Desejá continuar?',
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
      text: 'O grupo foi removido com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listGroups();
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
