import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { identificationTypes } from '../../../models/identification-types';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public mode: string;

  public title: string;

  public userForm: FormGroup;

  public submitted: boolean = false;

  public showSuccessMessage: boolean = false;

  public idTypes = identificationTypes;

  public users = [];

  public userSelected = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.route.data.subscribe(data => this.mode = data.mode);

    this.userForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      identification_code: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\d*$/) //Numeric
      ]),
      identification_type_id: new FormControl(null, Validators.required),
      birth_date: new FormControl(null, Validators.compose([
        Validators.required,
        this.validDate])),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
        Validators.pattern(/@[a-zA-Z]+\.[a-zA-Z]+$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(8)
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        this.passwordsShouldMatch()
      ]),
      rol: new FormControl(null),
      active: new FormControl(null)
    });

    if (this.mode === 'edit') {
      this.title = 'Modificación de usuario';
      this.userForm.controls.password.disable();
      this.userForm.controls.repeatPassword.disable();
    } else {
      this.title = 'Alta de usuario';
    }

  }

  validDate(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();

    if (Date.parse(control.value) > currentDate.getTime()) {
      return { invalidDate: true };
    }

    return null;
  }

  private getUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users.data;
      });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  duplicatedUsername(username) {
    const sameUsernames = this.users.filter(user => {
      return user.username === username;
    });
    let duplicated = false;
    if (this.mode === 'create' || (this.mode === 'edit' && this.userSelected.username !== username)) {
      //If new user or username was edited
      duplicated = sameUsernames.length > 0;
    }
    return (duplicated) ? true : false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.duplicatedUsername(this.userForm.controls.username.value)) {
      this.userForm.controls.username.setErrors({ 'duplicated': true });
      return;
    }

    if (this.userForm.invalid) {
      return;
    }
    const data = this.userForm.value;
    for (let key in data) {
      //Remove repeatPassword and null fields
      if (!data[key] || key === 'repeatPassword') {
        delete data[key];
      }
    }
    if (data.rol) {
      //If administrator is checked
      data.rol = 'admin';
    } else {
      data.rol = 'normal';
    }
    //Active means blocked input is NOT checked and viceversa
    data.active = !data.active;
    if (this.mode === 'create') {
      debugger;
      this.userService.createUser(data).subscribe(
        () => {
          this.showSuccessMessage = true;
          this.getUsers();
        },
        error => {
          //TODO: We should have specific error codes (existing user, you need to be admin, etc)
          //TODO: backend should validate identification_code
        }
      );
    } else if (this.mode === 'edit' && this.userSelected) {
      data.id = this.userSelected.id;
      this.userService.editUser(data).subscribe(
        () => {
          this.showSuccessMessage = true;
          this.getUsers();
          this.userSelected = null;
        },
        error => {
        }
      );
    }
  }

  passwordsShouldMatch() {
    return (repeatPassword: FormControl) => {
      if (this.userForm) {
        if (this.userForm.controls.password.value !== repeatPassword.value) {
          return { passwordsDontMatch: true };
        }
      }
    };
  }

  selectedUser(event) {
    if (event.target.value !== '0') {
      const user = this.users.find(user => user.id == event.target.value);
      this.userSelected = user;
      for (let key in this.userForm.controls) {
        this.userForm.controls[key].setValue(user[key]);
      }

      //TODO: birth_date format should be 'dd/mm/yyyy'
      const birthDate = this.datePipe.transform(
        new Date(user.birth_date), 'yyyy-MM-dd');

      this.userForm.controls['birth_date'].setValue(birthDate);
      this.userForm.controls['rol'].setValue(user.rol === 'admin');
      this.userForm.controls['active'].setValue(!user.active);
    } else {
      this.userSelected = null;
    }
  }

  changePasswordCheck(event) {
    if (event.target.checked) {
      this.userForm.controls.password.enable();
      this.userForm.controls.repeatPassword.enable();
    } else {
      this.userForm.controls.password.disable();
      this.userForm.controls.repeatPassword.disable();
    }
  }

}
