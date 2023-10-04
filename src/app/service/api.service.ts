import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  //url de la API backend blanca
  private urlApi = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }
  
  // getallclients
  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApi)
  }

  

  //post para almacenar en la base de datos.
  async  postData(url:string, body:any): Promise<any>{
    console.log("Enviado a la Base de datos")
    console.log(body)
    try{
      const response = await this.http.post(url,body).toPromise();
      return response
    }catch (error) {
      console.error('Error al llamar a la API', error);
      throw error;
  }
    
  }

  //post para verificarUsuarioyContraseña
  async  postVerify(body:any): Promise<any> {
    const  url = 'http://localhost:8080/api/verificarcli';
    try {
    const response = await this.http.post(url,body).toPromise();
    return response as string;
    }catch (error) {
      console.error('Error al llamar a la API', error);
      throw error;
  }
}

async  activar(body:any): Promise<any> {
  const  url = 'http://localhost:5000/getcode';
  try {
  const response = await this.http.post(url,body).toPromise();
  return response as string;
  }catch (error) {
    console.error('Error al llamar a la API', error);
    throw error;
}
}

  //post para verificar la 2FA de 6 digitos.
  public activar2FA(data:any):Observable<any>{
    //url al API 2FA
    const  url = 'http://localhost:5000/getcode';
    return this.http.post<any>(url,data);

    //despues de aqui el codigo se mando al correo.

    //---------> REVISAR EL CORREO ELECTRONICO
  }


   ///post al servicio para verificar los 6 digitos.
  async verificarCodigo(data:any):Promise<any>{
    const  url = 'http://localhost:5000/verifyCode';

    try {
      const response = await this.http.post(url,data).toPromise();
      return response
      }catch (error) {
        console.error('Error al llamar a la API', error);
        throw error;
    }
  }
}