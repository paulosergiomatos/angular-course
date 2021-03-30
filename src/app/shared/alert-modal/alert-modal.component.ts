import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'; // se ainda não foi usado na aplicacao, é necessário importar manualmente

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() type = 'success';
  @Input() message = '';
  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

}
