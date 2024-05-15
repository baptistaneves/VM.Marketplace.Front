import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';
import { RoleRequest } from '../../../models/roles/roleRequest';
import { ClaimRequest } from '../../../models/roles/claimRequest';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  addRoleForm: FormGroup;
  
  isFirstOpen = true
  errors: any[] = [];
  claims: any;

  roleRequest: RoleRequest;
  claimRequest: ClaimRequest[];

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Níveis de Acesso', route: '/niveis-de-acesso' },
      { label: 'Adicionar Perfil', active: true }
    ];

    this.listClaims();
    this.initializeAddRoleForm();
  }

  constructor(private roleService: RoleService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private cdr: ChangeDetectorRef) {

      this.claimRequest = [];

  }

  listClaims() {
    this.roleService.getRoleClaims()
    .subscribe(
      response =>  {
        this.claims = response.data;         
        this.cdr.detectChanges();
      },
      errors => { this.handleFail(errors); }
    )
  }

  initializeAddRoleForm() {
    this.addRoleForm = this.fb.group({
      name: ['', [Validators.required]],
      claims: [''],
    });
  }

  get f() { return this.addRoleForm.controls; }

  onCheckboxChange(key: string, claim: string) {

    const existingIndex = this.claimRequest.findIndex(c => c.claimType === key && c.claimValue === claim);

    if (existingIndex !== -1) {

      this.claimRequest.splice(existingIndex, 1);
    } else {

      const newClaim: ClaimRequest = { claimType: key, claimValue: claim };
      this.claimRequest.push(newClaim);

    }
  }

  addRole() {
    if(this.addRoleForm.dirty && this.addRoleForm.valid) {
      this.roleRequest = Object.assign({}, this.roleRequest, this.addRoleForm.value);
      this.roleRequest.claims = this.claimRequest;

      this.roleService.add(this.roleRequest)
            .subscribe(
              sucesso => { this.handleSuccessAddRole() },
              erros => { this.handleFail(erros) }
       );
    }
  }

  handleFail(fail: any) {
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  handleSuccessAddRole() {
    this.addRoleForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Perfil adicionado com sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/configuracao/niveis-de-acesso']);
      });
    }
  }

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

}
