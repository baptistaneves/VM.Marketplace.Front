import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';
import { RoleRequest } from '../../../models/roles/roleRequest';
import { ClaimRequest } from '../../../models/roles/claimRequest';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent {

   // bread crumb items
   breadCrumbItems!: Array<{}>;

   editRoleForm: FormGroup;
 
   tableSize: any = [10, 20, 50, 100];
   
   isFirstOpen = true
   errors: any[] = [];
   claims: any;
 
   roleRequest: RoleRequest;
   currentRole: RoleRequest = new RoleRequest();
   roleClaimToChange: RoleRequest = new RoleRequest();
   claimRequest: ClaimRequest[];
   roleId: string;
   check:boolean=false;
 
   canEnable: boolean = false;
 
 
   constructor(private roleService: RoleService,
               private toastr: ToastrService,
               private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private cdr: ChangeDetectorRef) {
 
       this.roleId = this.route.snapshot.params['id'];
       this.claimRequest = [];

       this.currentRole = this.route.snapshot.data['role'].data;
       this.roleClaimToChange.claims =  []
   }
 
   ngOnInit(): void {

     this.breadCrumbItems = [
       { label: 'Níveis de Acesso', route: '/perfis' },
       { label: 'Editar Perfil', active: true }
     ];
     
     this.listClaims();
     this.initializeEditRoleForm();
     this.disableForm();
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
 
   initializeEditRoleForm() {
     this.editRoleForm = this.fb.group({
       name: ['', [Validators.required]],
     });
 
     this.fillForm();
   }
 
   get f(){ return this.editRoleForm.controls; }

   fillForm() {
     this.editRoleForm.patchValue({
       name: this.currentRole.name
     });
   }
 
   onChange(event: any): void {
     if (event.target.checked) {
       this.enableform();
       this.check=true;
     } 
     else {
       this.disableForm();
       this.check=false;
     }
   }
 
   enableform() {
     this.editRoleForm.enable();
   }
 
   disableForm() {
     this.editRoleForm.disable();
   }
 
   onCheckboxChange(key: string, claim: string) {
 
     const existingIndex = this.roleClaimToChange.claims.findIndex(c => c.type === key && c.value === claim);
 
     if (existingIndex !== -1) {
 
       this.roleClaimToChange.claims.splice(existingIndex, 1);
 
       const removeClaim: ClaimRequest = { type: key, value: claim};
       this.roleClaimToChange.claims.push(removeClaim);
       
     } else {
 
       const newClaim: ClaimRequest = { type: key, value: claim};
       this.roleClaimToChange.claims.push(newClaim); 
     }
   }
 
   updateRole() {
     if(this.editRoleForm.valid) {
       this.roleRequest = Object.assign({}, this.roleRequest, this.editRoleForm.value);
       
       this.roleRequest.claims = this.roleClaimToChange.claims;
       this.roleRequest.id = this.currentRole.id;
 
       
       this.roleService.update(this.roleRequest)
             .subscribe(
               sucesso => { this.handleSuccessEditRole() },
               erros => { this.handleFail(erros) }
        );
     }
   }
 
   handleFail(fail: any) {
     this.errors = fail.error.data;
   }
  
   handleSuccessEditRole() {
     this.editRoleForm.reset();
     this.errors = [];
 
     this.toastr.success('Perfil actualizado com sucesso!');
     this.router.navigate(['/configuracao/niveis-de-acesso']);
   }
 
   getObjectKeys(obj: object): string[] {
     return Object.keys(obj);
   }
 
   isClaimSelected(claimType: string, claimValue: string): boolean {
    if(this.currentRole.claims) {
      return this.currentRole.claims.some(c => c.type === claimType && c.value === claimValue);
    }

    return false;
   }

}
