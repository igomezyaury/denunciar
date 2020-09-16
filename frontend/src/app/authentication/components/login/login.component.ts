import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public loginError: string;

  public submitted: boolean = false;

  private returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authenticationService.getToken()) {
      //If already logged in
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/assistances';
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const email: string = this.loginForm.controls.email.value;
    const password: string = this.loginForm.controls.password.value;

    this.authenticationService.login(email, password)
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          debugger;
          switch (error.status) {
            case 401:
              this.loginError =
                'Email o contraseña incorrectos. Por favor, verifique sus credenciales.';
              break;
            case 403:
              if (error.error.internal_code === 'blocked_user') {
                this.loginError =
                  'El usuario ha sido bloqueado por cantidad de intentos fallidos.';
              }
              break;
            case 404:
              this.loginError =
                'Email o contraseña incorrectos. Por favor, verifique sus credenciales.';
              break;
            default:
              this.loginError =
                'Ha ocurrido un problema con el servidor. Por favor, intente de nuevo más tarde.';
              break;
          }
        });
  }
}
