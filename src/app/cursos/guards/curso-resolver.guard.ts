import { Curso } from './../curso';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(
    private service: CursosService
    ) {}
  // ActivatedRouteSnapshot: fotografia da rota para extrair quais sao os aprametros da rota nesse momento,
  // state - estado da rota que n importa, mas vamos devolver um obsrvable de curso
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    // se  existir...colocar os cursos
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    } // caso n tenha...  vou retornar id e nome null para criar um curso novo

    return of({
      id: null,
      nome: null
    });
  }
}
