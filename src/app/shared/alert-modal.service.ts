import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

// refatorando para os proximos metodos, e indicando os tipos
  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) { // esse dismiss timeout é do hide q tb tem no aler-modalcomponent.ts
    // tipando a const(declarando o tipo)
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) { // ta vindo do confirm-modal
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    // o content faz com que eu consiga acessar tudo que é publico em confirm-modal.component
    bsModalRef.content.title = title; // acessandoa traves do content
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }
// o content faz com que eu consiga acessar tudo que é publico em confirm-modal.component
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult; // confirm result é do  confirm-modal.component
  }
}
