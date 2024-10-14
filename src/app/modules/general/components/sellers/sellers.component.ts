import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../configuration/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Seller } from '../../../configuration/models/users/seller';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.scss'
})
export class SellersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  errors: any[] = [];

  sellers: Seller[];
  isVerified: boolean = false;
  userId:string;
  businessLicenseUrl:string;

  sellerLinceseUrl: string = environment.apiUrlLinceseStaticFilesv1;

  constructor(private userService: UserService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Painel' },
      { label: 'Vendedores', active: true }
    ];

    this.listSellers();
  }

  listSellers() {
    this.userService.getAllSeller().subscribe(response => {
      this.sellers = response.data;
      console.log(this.sellers);
    });
  }

  isUserVeryfied(flag: boolean, userId:string, businessLicenseUrl:string) {
    this.userId = userId;
    this.businessLicenseUrl = businessLicenseUrl;
    if(flag  === false) {
      this.isVerified = false;
    }
    else {
      this.isVerified = true;
    }
  }

  verifyUser() {
    this.userService.verifyUser(this.userId).subscribe
    (
      success => {
        location.reload();
        this.toastr.success("Vendedor aprovado com sucesso");
      },
      error => {this.toastr.error('Opa!):', 'Ocorreu um erro')}
    );
  }

  unVerifyUser() {
    this.userService.unverifyUser(this.userId).subscribe
    (
      success => {
        location.reload();
        this.toastr.success("Vendedor reprovado com sucesso");
      },
      error => {this.toastr.error('Opa!):', 'Ocorreu um erro')}
    );
  }

  confirmUnverification() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este vendedor será reprovado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sim, Reprovar!',
      cancelButtonText: 'Não, cancelar!',
    }).then(result => {
      if (result.value) {
        this.unVerifyUser();
      }
    });
  }

}