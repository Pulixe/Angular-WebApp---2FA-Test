import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-twofactor',
  templateUrl: './twofactor.component.html',
  styleUrls: ['./twofactor.component.css']
})
export class TwofactorComponent {
  public myForm!:FormGroup;
  private responseText:any
  constructor(private fb:FormBuilder, private loginPrd:ApiService, private routerprd:Router) {

  }
  ngOnInit(): void {
    this.myForm = this.createMyForm();
   }

   private createMyForm():FormGroup{
    return this.fb.group({
      codigo:['',[Validators.required]]
    });
  }
  
  public get f():any{
    return this.myForm.controls;
  }

  
 async verificacionCodigo(){
    const data = {"codigo":this.myForm.value.codigo}
     console.log(data)
    try {
      this.responseText = await this.loginPrd.verificarCodigo(data);
      console.log(this.responseText.mensaje)
      if (this.responseText.mensaje == "valido"){
       alert("BIENVENIDO AL SISTEMA")
       await this.routerprd.navigateByUrl('');
      }else{
        alert("Codigo incorrecto ingrese sesion de nuevo")
         await this.routerprd.navigateByUrl("/login");
      }
      /*if(!this.responseText){
  
        console.log("invalido")
        alert("Usuario o contraseña invalido");
       }else{
        //si el usuario y la contraseña son verdaderos, va a redirigirse a la pagina que pide los 6 digitos.
         console.log(this.loginPrd.activar(jsoni));
         try {
  
         }catch (error) {
      // Maneja el error aquí si es necesario
         }
          this.activate2fa = await this.routerprd.navigateByUrl("/twofactor");
          console.log(this.activate2fa)
          
       }*/
    } catch (error) {
      // Maneja el error aquí si es necesario
    }
  }
}
