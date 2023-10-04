import { Component , OnInit} from '@angular/core';
import { ApiService } from '../service/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public Form!:FormGroup;
  constructor(private fb:FormBuilder, private apiService:ApiService, private routerprd:Router) {

  }

  ngOnInit(): void {
    this.Form = this.createMyForm();
   }

   private createMyForm():FormGroup{
    return this.fb.group({
      nombre:['',[Validators.required]],
      apellido:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }
  
  public get f():any{
    return this.Form.controls;
  }

async  llenarData(){
console.log("Se ejecuta l fucion llenarData")
    //aqui obtengo lo que envia el usuario.
    const datos = {
                    "nombre":this.Form.value.nombre,
                    "apellido": this.Form.value.apellido,
                    "email":this.Form.value.email,
                    "password":this.Form.value.password
                  }

   this.apiService.postData('http://localhost:8080/api/clientes', datos)
    this.routerprd.navigateByUrl("/login");
   }
}
