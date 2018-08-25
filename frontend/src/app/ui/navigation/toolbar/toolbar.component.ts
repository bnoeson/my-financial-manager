import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'mf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  private title = 'app';

  constructor() { }

  ngOnInit() {
  }

}
