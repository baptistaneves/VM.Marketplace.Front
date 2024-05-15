import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RoleService } from '../../../services/role.service';
import { RoleDto } from '../../../models/roles/roleDto';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrl: './list-roles.component.scss'
})
export class ListRolesComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  errors: any[] = [];
  roles: RoleDto[];

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  constructor(private roleService: RoleService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Perfis', active: true }
      ];

      this.listRoles();
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
  
    /**
  * Confirmation mail model
  */
  deleteRecord() {
    if (this.checkedValGet.length > 0) {
      this.deleteModal?.show();
    } 
    else {
      Swal.fire({ text: 'Por favor selecione pelo menos uma checkbox', confirmButtonColor: 'rgb(3, 142, 220)' });

    }
  }

  remove(id:string){
    this.roleService.remove(id)
    .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFail(erros) }
    );
   
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este perfil será excluido. Desejá continuar?',
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
          text: 'Remoção do perfil cancelada :)',
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
      text: 'O perfil foi removido com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listRoles();
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
