import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit {

  public refresh: Subject<any> = new Subject();

  constructor() { }

  ngOnInit(): void {
    
  }

  refreshImage(){
    this.refresh.next();
  }

}
