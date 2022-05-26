import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { delay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
// LOGICA TB TA AQUI NO SERVICE
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`; // variavel de ambiente

  constructor(
    private Http: HttpClient
    ) { }

  list() {
    return this.Http.get<Curso[]>(this.API) // conseguido parametrizar o tipo de retorno que foi imposto la no curso.ts
      .pipe(
       delay(2000),
       tap(console.log) // tap é um do
      );
  }
  loadByID(id: number) {
    return this.Http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
    // pego o caminho do cursos + id ( isso é para caso a pessoa coloque o id no browser)
    // take = qntas vezes quero receber uma resposta. Vou la no servidor, guardo um valor, salvo o valor, envio a resposta de sucesso ou erro
  }
// requisicao post para criar curso
  private create(curso: any) {
    return this.Http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: any) { // o caminho + id que quero atualizar
    return this.Http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }
// n importa se é edicao ou criacao, é apenas para salvar
  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id: number) {
    return this.Http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
