import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(id){
    this.navOpen = false;
  }


}
