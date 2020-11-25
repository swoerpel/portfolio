import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as p5 from 'p5';
import { tap } from 'rxjs/operators';
import { COLOR_PALETTE_NAMES } from 'src/app/shared/constants';
import { ArtActions } from 'src/app/state/actions';
import { ArtState } from 'src/app/state/art.reducer';
import { ArtSelectors } from '../../state/selectors';
import { Aggregator } from './sketch.aggregator';
import { Lattice } from './sketch.lattice';
import { Dims, SliceOffsets, SubGridParams } from './sketch.models';
import { defaultColors, frameRate } from './sketch.params';
@Component({
  selector: 'app-sketch',
  template: `<div (click)="refreshImage()" id="sketch-container"></div>`,
})
export class SketchComponent implements OnInit {

  constructor(
    private artStore: Store<ArtState>
  ) { }

  ngOnInit() {
    this.artStore.select(ArtSelectors.GetParams).pipe(
      tap(this.generate)
    ).subscribe();
  }

  public refreshImage(){
    this.artStore.dispatch(ArtActions.RefreshParams({key: ''}))
  }

  private generate({
    gridDims,
    canvasDims,
    colorPaletteNames,
    outlineParams,
    subGridDims,
    subGridScales,
    subGridStarts,
    subGridSteps,
    rotationOffsets,
  }){
    let node = document.createElement('div');
    node.id = 'sketch';
    let container = document.getElementById('sketch-container');
    let prev = document.getElementById('sketch');
    if(!!prev){
      container?.removeChild(prev);
    }
    container.appendChild(node);  
    var sketch = (p: p5) => {
      var graphic: p5.Graphics; 
      var pause = false;
      var lattices:Lattice[];
      p.setup = function () {
        setupGraphic();

        let aggregator = new Aggregator(
          gridDims,
          canvasDims,
          colorPaletteNames,
          outlineParams,
          subGridDims,
          subGridScales,//: number[][],
          subGridStarts,//: number[][],
          subGridSteps,//: number[][],
          rotationOffsets,//:  SliceOffsets[],
        );
        let latticeParameters: SubGridParams[] = aggregator.generateSubGridParams();
        lattices = latticeParameters.map((latticeParams: SubGridParams) => 
          new Lattice(
          graphic, 
          latticeParams.grid,
          latticeParams.slice,
          aggregator.generateColorMachines()
        ));
        resetGraphic();
        lattices.forEach((l,i)=>l.drawNext(i));
        p.image(graphic, 0, 0);
      }
    
      // p.draw = function () {
      //   if(!pause){
      //     // resetGraphic();
      //     // lattices.forEach((l,i)=>l.drawNext(i));
      //     // p.image(graphic, 0, 0);
      //     pause = true;
      //   }
      // }
    
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
    new p5(sketch,node);
  }



}
