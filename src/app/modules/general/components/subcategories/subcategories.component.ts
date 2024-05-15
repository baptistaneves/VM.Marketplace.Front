import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SubcategoryDto } from '../../models/subcategories/subcategoryDto';
import { CreateSubcategoryRequest } from '../../models/subcategories/createSubcategoryRequest';
import { UpdateSubcategoryRequest } from '../../models/subcategories/UpdateSubcategoryRequest';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {

  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  subcategories: SubcategoryDto[];
  createSubcategoryRequest: CreateSubcategoryRequest;
  updateSubcategoryRequest: UpdateSubcategoryRequest;

  categoryId: string;
  categoryDescription: string;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  constructor(private fb: FormBuilder,
              private subcategoryService: SubcategoryService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
        
      this.categoryDescription = this.route.snapshot.params['categoryDescription'];
      this.categoryId = this.route.snapshot.params['categoryId'];
  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Categorias' },
        { label: this.categoryDescription },
        { label: 'Subcategorias', active: true }
      ];

      this.listCities();
      this.initializeAddForm();
      this.initializeEditForm();
  }

  listCities() {
    this.subcategoryService.getSubcategoriesByCategory(this.categoryId)
          .subscribe(
            response =>{
              this.subcategories = response.data;
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

  fillForm(subcategory:SubcategoryDto) {
    this.editForm.patchValue({
      id: subcategory.id,
      description: subcategory.description
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

  addSubcategory() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createSubcategoryRequest = Object.assign({}, this.createSubcategoryRequest, this.addForm.value);

      this.createSubcategoryRequest.categoryId = this.categoryId;

      this.subcategoryService.add(this.createSubcategoryRequest)
            .subscribe(
              sucesso => { this.handleSuccessAddCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editSubcategory() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateSubcategoryRequest = Object.assign({}, this.updateSubcategoryRequest, this.editForm.value);
    
      this.updateSubcategoryRequest.categoryId = this.categoryId;
  
      this.subcategoryService.update(this.updateSubcategoryRequest)
            .subscribe(
              sucesso => { this.handleSuccessEditCity() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove(id:string){
    this.subcategoryService.remove(id)
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
        text: 'A subcategoria foi adicionada com sucesso.', 
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
        title: 'Actualizada!', 
        text: 'A subcategoria foi actualizada com sucesso.', 
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
      text: 'Esta subcategoria será excluida. Desejá continuar?',
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
          text: 'Remoção da subcategoria cancelada :)',
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
      text: 'A subcategoria foi removida com sucesso.', 
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
