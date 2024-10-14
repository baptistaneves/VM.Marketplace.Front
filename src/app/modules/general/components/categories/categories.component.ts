import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CreateCategoryRequest } from '../../models/categories/createCategoryRequest';
import { UpdateCategoryRequest } from '../../models/categories/UpdateCategoryRequest';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../models/categories/categoryDto';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { environment } from '../../../../../environments/environment';

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
  createCategoryResquest: CreateCategoryRequest;
  updateCategoryRequest: UpdateCategoryRequest;

  imageUrl:string;
  staticFileUrl = environment.apiUrlCategoryStaticFilesv1;

  imagemForm: any;
  imagemNome: string;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  checkedValGet: any[] = [];

  selectedGroupOption = 'Selecione o grupo';


  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Painel' },
        { label: 'Categorias', active: true }
      ];

      this.listCategories();
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

  fillForm(category:CategoryDto) {
    this.editForm.patchValue({
      id: category.id,
      description: category.description
    });

    this.imageUrl = category.imageUrl;
    console.log(this.staticFileUrl);
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

  addCategory() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createCategoryResquest = Object.assign({}, this.createCategoryResquest, this.addForm.value);

      let formdata = new FormData();
  
      formdata.append('category', JSON.stringify(this.createCategoryResquest));

      if(this.imagemForm && this.imagemNome) {
        formdata.append('imageFile', this.imagemForm, this.imagemNome);
      }


      this.categoryService.add(formdata)
            .subscribe(
              sucesso => { this.handleSuccessAddCategory() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  editCategory() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.updateCategoryRequest = Object.assign({}, this.updateCategoryRequest, this.editForm.value);

      let formdata = new FormData();
  
      formdata.append('category', JSON.stringify(this.updateCategoryRequest));

      if(this.imagemForm && this.imagemNome) {
        formdata.append('imageFile', this.imagemForm, this.imagemNome);
      }

      this.categoryService.update(formdata)
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
  
  handleSuccessAddCategory() {
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

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.imagemForm =  file;
          this.imagemNome =  droppedFile.relativePath;

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }


}
