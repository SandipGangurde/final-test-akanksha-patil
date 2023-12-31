import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public passwordType: string = 'password'
  public passwordVisibility: string = 'fa fa-eye'
  constructor(
    private accountService: AccountService,
    private toastrService: ToastrService,
    private router: Router) { }

  /**
   * The ngOnInit function removes the 'userName' item from the localStorage.
   */
  ngOnInit() {
    localStorage.removeItem('userName');
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  /*  is creates an instance of the `FormGroup` class from the `@angular/forms`
  module. */
  public loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  /**
   * The login function checks if the provided username and password match any user in the users list.
   */
  public login(): void {
    debugger;
    let user = {
      email: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.accountService.login(user).subscribe((response: any) => {
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
        this.toastrService.success('User logged in successsfully', 'Success');
        this.router.navigate(['/dashboard']);
    }, ()=>{
      this.toastrService.error('Invalid Username or Password', 'Error')
    })
  }

  private checkUserExists(): void {
    let payload = {
      email: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value
    }
  }

  changePasswordType(): void {
    if (this.passwordType == 'text') {
      this.passwordType = 'password';
      this.passwordVisibility = 'fa fa-eye'
    }
    else {
      this.passwordType = 'text';
      this.passwordVisibility = 'fa fa-eye-slash'
    }
  }
  /**
   * The function checks if a form control is invalid and has been interacted with by the user.
   * @param {string} controlName - The controlName parameter is a string. It is form control in the employeeShiftForm.
   * @returns a boolean value.
   */
  public checkIfControlValid(controlName: string): any {
    return this.loginForm.get(controlName)?.invalid &&
      this.loginForm.get(controlName)?.errors &&
      (this.loginForm.get(controlName)?.dirty || this.loginForm.get(controlName)?.touched);
  }

  /**
   * The function checks if a specific control in a form has a specific error.
   * @param {string} controlName - The name of the form control you want to check for errors.
   * @param {string} error - The "error" parameter is for check specific error
   * @returns the result of calling the `hasError` method 
   */
  public checkControlHasError(controlName: string, error: string): any {
    return this.loginForm.get(controlName)?.hasError(error)
  }
}
