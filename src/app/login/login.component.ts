import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseText:any
  activate2fa:any
  public myForm!:FormGroup;
 constructor(private fb:FormBuilder, private loginPrd:ApiService, private routerprd:Router) {

 }

 ngOnInit(): void {
  this.myForm = this.createMyForm();
 }

 private createMyForm():FormGroup{
  return this.fb.group({
    email:['',[Validators.required]],
    password:['',Validators.required]
  });
}

public get f():any{
  return this.myForm.controls;
}

async submitFormulario(){
  if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
  }
  //aqui obtengo lo que envia el usuario.
    const jsoni = {"email":this.myForm.value.email, "password": this.myForm.value.password}
 
 

  try {
    this.responseText = await this.loginPrd.postVerify(jsoni);
    console.log(this.responseText)
    if(!this.responseText){

      console.log("invalido")
      alert("Usuario o contraseña invalido");
     }else{
      //si el usuario y la contraseña son verdaderos, va a redirigirse a la pagina que pide los 6 digitos.
       console.log(this.loginPrd.activar(jsoni));
       try {
        this.activate2fa = await this.routerprd.navigateByUrl("/twofactor");
        console.log(this.activate2fa)
       }catch (error) {
    // Maneja el error aquí si es necesario
       }
        
        
     }
  } catch (error) {
    // Maneja el error aquí si es necesario
  }
}
}
