import * as tome from 'chromotome';
import * as chroma from 'chroma.ts';
import { linSet, rotateArray } from './sketch.helpers';
import { 
    Dims, 
    GridParams, 
    PaletteConfig, 
    SliceParams, 
    SubGridParams 
} from './sketch.models';
import { 
    canvasDims, 
    colorPaletteNames, 
    gridDims, 
    outlineParams, 
    rotationOffsetFn, 
    rotationParams, 
    scalesFn, 
    startsFn, 
    stepsFn, 
    subGridDimsFn, 
} from './sketch.params';

export class Aggregator {

    private color_palettes = {};

    constructor() { }

    generateSubGridParams(): SubGridParams[]{
        let subGridParams: any = [];
        let index = 0;
        for(let i = 0; i < gridDims.width; i++){
            for(let j = 0; j < gridDims.height; j++){
                subGridParams.push({
                    grid: this.toGridParams(i,j, index),
                    slice: this.toSliceParams(i,j,index)
                })
                index++;
            }
        }
        return subGridParams;
    }

    public toGridParams(i,j,index):GridParams{
        let canvas: Dims = {
            width: canvasDims.width / (gridDims.width),
            height: canvasDims.height / (gridDims.height),
        }
        let grid = subGridDimsFn(i,j,index)
        return {
            canvas,
            grid,
            cell:{
                width: canvas.width / grid.x,
                height: canvas.height / grid.y,
            },
            origin:{
                x: canvasDims.width * i / gridDims.width,
                y: canvasDims.height * j / gridDims.height,
            }
        }
    }

    public toSliceParams(i,j,index): SliceParams{
        return {
            offsets: {...rotationOffsetFn(i,j,index)},
            outline: outlineParams,
            rotation:(rotationParams.randomize) ? 
            ({
                randomize: rotationParams.randomize,
                values: rotationParams.values
            }) : 
            ({randomizeRoataion: rotationParams.randomize}),
            scales: scalesFn(i,j,index),
            starts: startsFn(i,j,index),
            steps: stepsFn(i,j,index),
        }
    }

    public generateColorMachines(){
              // aggregate palettes
        let chromotome_palettes = tome.getAll();
        // console.log('chromotome_palettes',chromotome_palettes)
        for (let i = 0; i < chromotome_palettes.length; i++) {
            let key = chromotome_palettes[i].name;
            this.color_palettes[key] = new Object(chromotome_palettes[i].colors);
        }
        this.color_palettes = { ...this.color_palettes, ...chroma.brewer };
        // read palette config and create color_machines
        return this.generatePaletteConfigs(colorPaletteNames,3).map((pk: PaletteConfig) => {
            let key = pk.key;
            if(pk.key.toLowerCase() === 'random'){
                let paletteNames: string[] = Object.keys(this.color_palettes);
                key = paletteNames[Math.floor(Math.random() * paletteNames.length)]
            }
            let cp: number[] = this.color_palettes[key];
            if(pk.reversed){
                cp.reverse();
            }
            return chroma.scale(rotateArray(cp, pk.rotate))
        });
    }

    private generatePaletteConfigs(paletteNames: string[], count: number){
        return Array.from({length: count}, (_,i) => ({
            key: paletteNames[i % paletteNames.length],
            reversed: i % 2 === 0,
            rotate: i,
        }));
    }


}