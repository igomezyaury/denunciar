import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { identificationTypes } from '../../../models/identification-type';
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
      birth_date: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        this.passwordsShouldMatch()
      ]),
      rol: new FormControl(null),
      active: new FormControl(null)
    });

    if(this.mode === 'edit'){
      this.title = 'Modificación de usuario';
      this.userForm.controls.password.disable();
      this.userForm.controls.repeatPassword.disable();
    }else{
      this.title = 'Alta de usuario';
    }
    
  }

  ngOnInit(): void {
    if(this.mode === 'edit'){
      this.userService.getAllUsers().subscribe(
        users => {
          this.users = users.data;
        } 
      )
    }
  }

  onSubmit(){
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const data = this.userForm.value;
    for(let key in data){
      //Remove repeatPassword and null fields
      if(!data[key] || key === 'repeatPassword'){
        delete data[key];
      }
    }
    if(data.rol){
      //If administrator is checked
      data.rol = 'admin';
    }
    if(data.active){
      //If blocked is checked
      data.active = false;
    }
    if(this.mode === 'create'){
      debugger;
      this.userService.createUser(data).subscribe(
        () => { 
          this.showSuccessMessage = true;
        },
        error => {
          //TODO: We should have specific error codes (existing user, you need to be admin, etc)
          //TODO: backend should validate identification_code
        }
      );
    }else if(this.mode === 'edit' && this.userSelected){
      debugger;
      data.id = this.userSelected.id;
      this.userService.editUser(data).subscribe(
        () => { 
          this.showSuccessMessage = true;
          return console.log('User edited!'); 
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

  selectedUser(event){
    if(event.target.value !== '0'){
      const user = this.users.find(user => user.id == event.target.value);
      this.userSelected = user;
      for(let key in this.userForm.controls){
          this.userForm.controls[key].setValue(user[key]);
      }

      //TODO: birth_date format should be 'dd/mm/yyyy'
      // const birthDate = this.datePipe.transform(
      //   new Date(user.birth_date),'dd/mm/yyyy');

      // this.userForm.controls['birth_date'].setValue(birthDate);
      this.userForm.controls['rol'].setValue(user.rol === 'admin');
      this.userForm.controls['active'].setValue(!user.active);
    }else{
      this.userSelected = null;
    }
  }

  changePasswordCheck(event){
    if(event.target.checked){
      this.userForm.controls.password.enable();
      this.userForm.controls.repeatPassword.enable();
    }else{
      this.userForm.controls.password.disable();
      this.userForm.controls.repeatPassword.disable();
    }
  }

}
