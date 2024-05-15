import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CreateAdminUserRequest } from '../../../models/users/createAdminUserRequest';
import { UserService } from '../../../services/user.service';
import { UserDto } from '../../../models/users/userDto';
import { RoleService } from '../../../services/role.service';
import { RoleDto } from '../../../models/roles/roleDto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  users: UserDto[];
  roles: RoleDto[];

  createUserRequest: CreateAdminUserRequest;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  selectedRoleOption = 'Selecione o perfil';

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private roleService: RoleService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Utilizadores', active: true }
      ];

      this.listUsers();
      this.listRoles();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listUsers() {
    this.userService.getAll()
          .subscribe(
            response =>{
              this.users = response.data;
            },
            errors => { this.handleFail(errors); }
          )
  }

  listRoles() {
    this.roleService.getAll()
          .subscribe(
            response =>{
              this.roles = response.data;
            },
            errors => { this.handleFail(errors); }
          )
  }

  initializeAddForm() {
    this.addForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: [''],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  initializeEditForm() {
    this.editForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  fillForm(user:UserDto) {
    this.editForm.patchValue({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
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
      this.createUserRequest = Object.assign({}, this.createUserRequest, this.addForm.value);

      this.userService.add(this.createUserRequest)
            .subscribe(
              sucesso => { this.handleSuccessAddCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  // editState() {
  //   if(this.editForm.dirty && this.editForm.valid) {
  //     this.updateStateRequest = Object.assign({}, this.updateStateRequest, this.editForm.value);

  //     this.stateService.update(this.updateStateRequest)
  //           .subscribe(
  //             sucesso => { this.handleSuccessEditCity() },
  //             erros => { this.handleFail(erros) }
  //           );
  //   }
  // }

  remove(id:string){
    this.userService.remove(id)
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
        text: 'O utilizador foi adicionado com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listUsers();
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
        text: 'O utilizador foi actualizada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listUsers();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este utilizador será excluido. Desejá continuar?',
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
          text: 'Remoção do utilizador cancelada :)',
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
      text: 'O utilizador foi removido com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listUsers();
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
