import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() msg: string | undefined;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult: Subject<boolean> = new Subject();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): any {
    this.confirmResult = new Subject();
  }

  onConfirm(): any{
    this.setConfirmResultAndHide(true);
  }

  onClose(): void{
    this.setConfirmResultAndHide(false);
  }

  private setConfirmResultAndHide(val: boolean): void
  {
    this.confirmResult?.next(val);
    this.bsModalRef.hide();
  }


}
