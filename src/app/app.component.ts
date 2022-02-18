import { Component } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import {MatIconModule} from '@angular/material/icon';
import { ConsumoService } from './services/consumo.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'santan';
  public resultadosFinales = "";
  public arrayPaises : any[] = [];

  nombrePais = "";

  pais = "";
  nombreOficial = "";
  capitales : any[] = [];
  mostrarInfo = false;
  mostrarError = false;
  mostrarTodosPaises = false;
  constructor(
    private consumoService : ConsumoService
    ) {}
  
  
  ngOnInit() {
    
   } 
  
  getResultado(pais: string) {
    if (pais != '' && typeof pais === 'string') {
      this.consumoService.getResultado(pais).subscribe(response => {

        if (Array.isArray(response) && response.length > 0) {
          for (let x of response) {
            this.pais = x.name.common;
            this.capitales = x.capital;
          }
  
          if (this.pais != '' && Array.isArray(this.capitales) && this.capitales.length > 0) {
            this.mostrarInfo = true;
            this.mostrarError = false;
          } else {
            this.mostrarInfo = false;
            this.mostrarError = true;
          }
        }
       
      }, (err: HttpErrorResponse) => {
          if (err) {
            this.mostrarInfo = false;
            this.mostrarError = true;
          }
      })

    } else {
      this.mostrarInfo = false;
      this.mostrarError = true;
    }
  }

  obtenetTodosPaises() {
    this.consumoService.getTodosPais().subscribe(response => {
      console.log(response);
      if (Array.isArray(response) && response.length > 0) {
        this.arrayPaises = response;
        this.mostrarTodosPaises = true;
      } else {
        this.mostrarTodosPaises = false;
        this.mostrarError = true;
      }
    }, (err: HttpErrorResponse) => {
        if (err) {
          this.mostrarTodosPaises = false;
          this.mostrarError = true;
        }
    })
  }
}


