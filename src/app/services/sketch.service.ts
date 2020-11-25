import { Injectable } from '@angular/core';
import { Dims, Point, SliceOffsets } from '../components/sketch/sketch.models';
import { COLOR_PALETTE_NAMES } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  private subGridDims: Point[] = [
    {x:1,y:1},
    {x:2,y:2},
    {x:4,y:4},
  ]
  private subGridScales: number[][] = [
      [1,.9,.8,.7,.6,.5,.4],
      [Math.sqrt(2),1,1-(Math.sqrt(2)-1)],
  ]
  private subGridStarts: number[][] = [
      [0,45,90],
      [90,180],
      [180,270],
      // [270],
  ]
  private subGridSteps: number[][] = [
      [90,180,360],
      [135],
      [180],
      [270],
      [315],
      [360],
  ]

  private gridDims: Dims = {
      width:4,
      height:2,
  }

  private canvasDims = {
      width: 400*2,
      height: 400,
      border: {
          x: 20,
          y: 20,
      }
  }

  private getNewColorPaletteNames = (): string[] => ([
      COLOR_PALETTE_NAMES[Math.floor(Math.random() * COLOR_PALETTE_NAMES.length)],
      COLOR_PALETTE_NAMES[Math.floor(Math.random() * COLOR_PALETTE_NAMES.length)],
      COLOR_PALETTE_NAMES[Math.floor(Math.random() * COLOR_PALETTE_NAMES.length)],
  ]);


  private outlineParams = {
      width: 0.00,
      color: 'black'
  }

  private rotationOffsets: SliceOffsets[] = Array.from(
      {length: 20}, (_,i) => ({
          startRotation: 0, 
          arcLength:0
      })
  );

  constructor() { }

  public getParameterSet(key){
    return {
      gridDims: this.gridDims,
      canvasDims: this.canvasDims,
      colorPaletteNames: this.getNewColorPaletteNames(),
      outlineParams: this.outlineParams,
      subGridDims: this.subGridDims,
      subGridScales: this.subGridScales,
      subGridStarts: this.subGridStarts,
      subGridSteps:this.subGridSteps,
      rotationOffsets: this.rotationOffsets,
    }
  }
}
