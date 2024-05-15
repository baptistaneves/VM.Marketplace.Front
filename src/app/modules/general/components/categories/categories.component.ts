import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CreateGroupRequest } from '../../models/groups/createGroupRequest';
import { Group } from '../../models/groups/groups';
import { UpdateGroupRequest } from '../../models/groups/updateGroupRequest';
import { GroupService } from '../../services/group.service';
import { Category } from '../../models/categories/category';
import { CreateCategoryRequest } from '../../models/categories/createCategoryRequest';
import { UpdateCategoryRequest } from '../../models/categories/UpdateCategoryRequest';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../models/categories/categoryDto';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  categories: CategoryDto[];
  groups: Group[];
  createCategoryResquest: CreateCategoryRequest;
  updateCategoryRequest: UpdateCategoryRequest;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  selectedGroupOption = 'Selecione o grupo';


  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private groupService: GroupService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Categorias', active: true }
      ];

      this.listCategories();
      this.listGroups();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listCategories() {
    this.categoryService.getAll()
          .subscribe(
            response =>{
              this.categories = response.data;
            },
            errors => { this.handleFail(errors); }
          )
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
      description: ['', [Validators.required]],
      groupId: ['', [Validators.required]]
    });
  }

  initializeEditForm() {
    this.editForm = this.fb.group({
      description: ['', [Validators.required]],
      groupId: ['', [Validators.required]],
      id: ['']
    });
  }

  fillForm(category:CategoryDto) {
    this.editForm.patchValue({
      id: category.id,
      description: category.description,
      groupId: category.groupId
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

  addGroup() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createCategoryResquest = Object.assign({}, this.createCategoryResquest, this.addForm.value);

      this.categoryService.add(this.createCategoryResquest)
            .subscribe(
              sucesso => { this.handleSuccessAddGroup() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editCategory() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateCategoryRequest = Object.assign({}, this.updateCategoryRequest, this.editForm.value);

      this.categoryService.update(this.updateCategoryRequest)
            .subscribe(
              sucesso => { this.handleSuccessEditCategory() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove(id:string){
    this.categoryService.remove(id)
    .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFail(erros) }
    );
   
  }
  
  handleSuccessAddGroup() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Adicionada!', 
        text: 'A categoria foi adicionada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listCategories();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  handleSuccessEditCategory() {
    this.addForm.reset();
    Swal.fire(
      { 
        title: 'Actualizada!', 
        text: 'A categoria foi actualizada com sucesso.', 
        confirmButtonColor: 'rgb(3, 142, 220)', 
        icon: 'success', 
      }).then(result => {
        if (result.value) {
          this.listCategories();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      });;
  }

  confirmRemove(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta categoria será excluida. Desejá continuar?',
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
          text: 'Remoção da categoria cancelada :)',
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
      text: 'A categoria foi removida com sucesso.', 
      confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', 
    }).then(result => {
      if (result.value) {
        this.listCategories();
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
