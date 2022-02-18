import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  private BASE_URL = "https://restcountries.com/v3.1";
  
  constructor(
    private http : HttpClient
  ) {  }

  getResultado (pais: string) {
    return this.http.get<any>(this.BASE_URL + "/name/" + `${pais}`, {});
  }
  
  getTodosPais () {
    return this.http.get<any>(this.BASE_URL + "/all", {});
  }
  
}
