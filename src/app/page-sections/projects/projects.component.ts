import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public text = {
    snakePit: {
      title: 'Snake Pit Image Generation Art Algorithm',
      desc: 'This is a generative art algorithm I have created insipred by the "Trapped Knight" logic puzzle. Imagine a knight on a chessboard jumping around between squares, however once the knight has visited a square it cannot visit again. I took this simple concept and generalized it to any size grid, any knight movement, and added a path to follow where the knight has been. This is the first algorithm I have created in which I can really call my own. This project was written using the P5JS graphics library with the TypeScript extension. I also did create another serverside version utilizing NodeJS and SVGJS to generate SVGs instead of PNGs.',
    },
    cartographer:{
      title: 'Google Maps Styling Studio',
      desc: 'An on going project of mine is writing programs to make styling Google maps easier. It can be summed up as a one stop shop to style a map of any city with any set of colors. It is an Angular application using NgRX Redux for state management with data persisted using Google Firebase. This is hands down the most large scale and complicated project I have worked on so far in my software career.',
    },
    twitterBot: {
      title: 'Generative Art Twitter Bot',
      desc: 'After working on frontend generative art programs, I wanted to created a backend version that would automatically generate images and post them to twitter automatically on a timer. It is a NodeJS program hosted with Heroku setup to post an image once a day. I have not touched the code in over a year and it still continues to produce new images without any kind of database hooked up.',
    },
    pokeball:{
      title: 'Polar Coordinate Pokeball Generative Art Algorithm',
      desc: 'Sometimes when I need to take a break from web development work, I will start a new generative art program with absolutely zero game plan on what its going to turn into. In this case, the program ended up creating grids of nested circles that I think look quite like "PokeBalls". It is once again a P5JS program utilizing TypeScript to aid in parameter management. These generative art programs have increasingly more and more free parameters to work with such that without the strong typing TypeScript provides, it would be much more difficult to keep things organized.'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
