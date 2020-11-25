import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as p5 from 'p5';
import { Subject } from 'rxjs';
import { ArtState } from 'src/app/state/art.reducer';
import { Aggregator } from './sketch.aggregator';
import { Lattice } from './sketch.lattice';
import { canvasDims, defaultColors, frameRate } from './sketch.params';


@Component({
  selector: 'app-sketch',
  template: `<div id="sketch-container"></div>`,
})
export class SketchComponent implements OnInit {

  @Input() refresh: Subject<any>;
  private prevSketch: any;
  constructor(
    private artStore: Store<ArtState>
  ) { }

  ngOnInit() {
    this.generate();
    this.refresh.subscribe(this.generate);
  }

  generate(){
    var sketch = function (p: p5) {
      var graphic: p5.Graphics; 
      var pause = false;
      var lattices:Lattice[];
      p.setup = function () {
        setupGraphic();
        let aggregator = new Aggregator();
        lattices = aggregator.generateSubGridParams().map((lp) => 
          new Lattice(
          graphic, 
          lp.grid,
          lp.slice,
          aggregator.generateColorMachines()
        ));
      }
    
      p.draw = function () {
        if(!pause){
          resetGraphic();
          lattices.forEach((l,i)=>l.drawNext(i));
          p.image(graphic, 0, 0);
          pause = true;
        }
      }
    
      function resetGraphic(){
        graphic.clear();
        graphic.background(defaultColors.background);
        graphic.strokeJoin(p.ROUND);
        graphic.strokeWeight(0);
      }
    
      function setupGraphic(){
        p.frameRate(frameRate);
        const rw = canvasDims.width + canvasDims.border.x * 2
        const rh = canvasDims.height + canvasDims.border.y * 2
        p.createCanvas(rw, rh)
        graphic = p.createGraphics(rw, rh);
        graphic.translate(canvasDims.border.x, canvasDims.border.y)

        resetGraphic();
      }
    
      p.keyPressed = function (){
        // switch(event.key){
        //   case " ": pause = !pause; break;
        // }
      }
    }
    this.prevSketch?.remove();
    let node = document.createElement('div');
    node.id = 'sketch';
    new p5(sketch,node);
    document.getElementById('sketch-container').appendChild(node);  
    this.prevSketch = document.getElementById('sketch');
  }



}
