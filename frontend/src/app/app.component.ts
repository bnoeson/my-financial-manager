import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'app';

  ngOnInit() {
  }

  getToolbarHeight(): number {
    return document.getElementsByClassName('mat-toolbar')[0].clientHeight;
  }

}
