import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Usuario  } from '../models/UserModel'
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm : FormControl;
  public user : Usuario;
  public Login : any;
  public Resp : any;
  public Success : boolean = true;
  public Message : string;
  public identity;
  public texto;
  public jey;
  public hola;
  public into;
  LogForm : FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  passFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private router : Router, private form : FormBuilder, private service : UserService,
    private _snackBar: MatSnackBar) {
    this.user = new Usuario ();
   }

  ngOnInit() {
    this.into = this.service.getLogin();
      if (this.into){
        this.router.navigate(['inicio']);
      }
      this.user = this.service.getIdentity(); 
  }

  onSubmit(){
    try{
      this.Login = this.SaveLogin();
      //console.log(this.Login);
      this.service.logUser(this.Login).subscribe(response => {
        this.Resp = response;
        this.texto = this.Resp._body;
        this.jey = JSON.parse(this.texto);
        this.Success = this.jey.success;
        this.Message = this.jey.message;
        this.hola = this.jey.hola;
        this.openSnackBar(this.Message);
        if (this.Success){
          console.log(this.jey)
          this.router.navigate(['/inicio']);
          localStorage.setItem('into', JSON.stringify(this.Success));
          localStorage.setItem('tok', JSON.stringify(this.jey.token));
          localStorage.setItem('puesto', JSON.stringify(this.jey.puesto));
          localStorage.setItem('user', JSON.stringify(this.jey.username));
          localStorage.setItem('id', JSON.stringify(this.jey.id));
          localStorage.setItem('permisos', JSON.stringify(this.jey.permisos));
          window.location.reload();
        }

      })
    } catch(error){
      console.log('Error de logueo');
    }
  }

  SaveLogin(){
    const SaveLogin = {
      Username : this.emailFormControl.value,
      Password : this.passFormControl.value,
    }
    console.log(SaveLogin);

    return SaveLogin;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 5000,
    });
  }

  

  

}
