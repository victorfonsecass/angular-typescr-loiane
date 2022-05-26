import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  private emissor$ = new Subject<string>(); // emissor é um observible......    para criar um novo observable, essa linha é um exemplo.
  // subject é um emissor

  emitirValor(valor: string) {
    this.emissor$.next(valor);
    // o metodo next ta emitindo um novo valor
  }

  getValor() {
    return this.emissor$.asObservable();
  }

}
