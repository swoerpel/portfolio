import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public text = {
    snakePit: {
      title: 'Snake Pit Image Generation Algorithm',
      desc: 'This is a generative art algorithm I have created insipred by the "Trapped Knight" logic puzzle. Imagine a knight on a chessboard jumping around between squares, however once the knight has visited a square it cannot visit again. I took this simple concept and generalized it to any size grid, any knight movement, and added a path to follow where the knight has been. This is the first algorithm I have created in which I can really call my own.',
    },
    cartographer:{
      title: 'Google Maps Styling Studio',
      desc: '',
    },
    twitterBot: {
      title: 'Generative Art Twitter Bot',
      desc: '',
    },
    calcutta:{
      title: 'Calcutta - Pool Betting Management App',
      desc: ''
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
