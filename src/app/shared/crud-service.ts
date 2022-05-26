import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';

export class CrudService<T> { // o t é o tipo do crud, que vem de curso

  constructor(protected http: HttpClient, private API_URL) {}

  list() {
    return this.Http.get<T[]>(this.API_URL) // conseguido parametrizar o tipo de retorno que foi imposto la no curso.ts
      .pipe(
       delay(2000),
       tap(console.log) // tap é um do
      );
  }
  loadByID(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
    // pego o caminho do cursos + id ( isso é para caso a pessoa coloque o id no browser)
    // take = qntas vezes quero receber uma resposta. Vou la no servidor, guardo um valor, salvo o valor, envio a resposta de sucesso ou erro
  }
// requisicao post para criar curso
  private create(curso: T) {
    return this.http.post(this.API_URL, curso).pipe(take(1));
  }

  private update(curso: T) { // o caminho + id que quero atualizar
    return this.http.put(`${this.API_URL}/${curso.id}`, curso).pipe(take(1));
  }
// n importa se é edicao ou criacao, é apenas para salvar
  save(curso: T) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
