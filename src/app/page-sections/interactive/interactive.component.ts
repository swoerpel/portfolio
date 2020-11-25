import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ArtState } from 'src/app/state/art.reducer';
import { Store } from '@ngrx/store';
import { ArtActions } from 'src/app/state/actions';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit {


  constructor(
    private artStore: Store<ArtState>
  ) { }

  ngOnInit(): void {
    // this.refresh.next();
  }



}
