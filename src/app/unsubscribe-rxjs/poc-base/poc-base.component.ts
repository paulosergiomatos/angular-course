import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html',
  styleUrls: ['./poc-base.component.scss']
})
export class PocBaseComponent implements OnInit {

  @Input() nome = '';
  @Input() valor = '';
  @Input() estilo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
