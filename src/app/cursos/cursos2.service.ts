import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
// extends =  pegando tudo de crud service/ curso
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected Http: HttpClient) {
    // recebendo http
    super(Http, `${environment.API}cursos`);
  }

  loadByID(id) {
    return null;
  }
}
