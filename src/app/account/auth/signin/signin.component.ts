import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from '../../models/loginRequest';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent {
  year: number = new Date().getFullYear();
  fieldTextType!: boolean;

  errors: any[] = [];
  loginForm: FormGroup;
  loginModel: LoginRequest;

  returnUrl: string;

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() {return this.loginForm.controls;}

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loginModel = Object.assign({}, this.loginModel, this.loginForm.value);

      this.authenticationService.login(this.loginModel)
      .subscribe(
          success => {
            this.handleSuccess(success);
          },
          error => {this.handleFailure(error)}
      );
    }
  }

  handleSuccess(response: any) {
      this.loginForm.reset();
      this.errors = [];

      this.authenticationService.LocalStorage.saveLocalUserData(response);

      this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!');
      this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/']);
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    console.log(this.errors);
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }


    /**
   * Password Hide/Show
   */
    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
}
