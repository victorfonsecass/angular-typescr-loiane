import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, Subject, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal;

  cursos$!: Observable<Curso[]>;// qnd tem esse $, quer dizer que essa variavel é um observable
  error$ = new Subject<boolean>(); // é boolean, para sempre que ser emitido um erro, venha como true e mostre erro

  cursoSelecionado!: Curso;


  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute

    ) { }

  ngOnInit() {
 //  this.cursos$ = this.service.list();// list  retorna um observable..( escutando mudancas) de cursos
  this.onRefresh();

  } //  qnd me inscrevo no observable, tb prciso me desinscrever pq mesmo qnd eu destuir o componente, pode ser que essa inscricao continue ativa por baix dos panos
  // e vai ficar consumindo a memoria sem ter a necessidade
  onRefresh() {
    this.cursos$ = this.service.list().pipe(

      catchError(error => {
        console.error(error);
        this.handleError();
        return EMPTY;
      })
    );
  }
  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');

  }
  onEdit(id: number) {
     // editar é o nome da rota, id é o que ta sendo recebido, para edicar o id especificamente
    this.router.navigate(['editar', id], { relativeTo: this.route }); // preciso sempre colocare isso. é a rota que esdta ativa no momento
  }

  onDelete(curso: any) {
    // quando o usuario clicar em delete, ele vai pegar uma copia do curso que foi passado como parametro
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

  // esse result na vdd é um subject, mas como quero que retorne um observable,  adiciono asobservable apra transfornmacao
    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }
  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
