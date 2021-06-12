import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() message: string
  @Input() type: string = 'success'

  constructor(
    public modal: BsModalRef
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  onClose(){
    this.modal.hide()
  }

}
