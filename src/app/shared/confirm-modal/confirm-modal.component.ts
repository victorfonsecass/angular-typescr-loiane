import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title!: string;
  @Input() msg!: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult!: Subject<boolean>; // o reasultado da pop up vai ser do tipo subject, o componente confirm-modal
  //  vai retornar true, caso o usuaario clique na confirmacao, e retonar false caso o usuario n queria fazer nada

  constructor(
    public bsModalRef: BsModalRef
    ) { }

  ngOnInit() {
    this.confirmResult = new Subject(); // inidicalizando confirmresult e instanciando um novo subejct
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

}
