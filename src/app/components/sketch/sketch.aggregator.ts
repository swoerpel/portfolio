import * as tome from 'chromotome';
import * as chroma from 'chroma.ts';
import { linSet, rotateArray } from './sketch.helpers';
import { 
    Dims, 
    GridParams, 
    PaletteConfig, 
    Point, 
    SliceOffsets, 
    SliceParams, 
    SubGridParams 
} from './sketch.models';

export class Aggregator {

    private randomRotationParams = {
        randomize: false,
        values: [45,90,135]
    };

    private color_palettes = {};

    constructor(
        private gridDims: Dims,
        private canvasDims: Dims,
        private colorPaletteNames: string[],
        private outlineParams: any,
        private subGridDims: Point[],
        private subGridScales: number[][],
        private subGridStarts: number[][],
        private subGridSteps: number[][],
        private rotationOffsets:  SliceOffsets[],
    ) { }


    public generateSubGridParams(): SubGridParams[]{
        let subGridParams: any = [];
        let index = 0;
        for(let i = 0; i < this.gridDims.width; i++){
            for(let j = 0; j < this.gridDims.height; j++){
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
            width: this.canvasDims.width / (this.gridDims.width),
            height: this.canvasDims.height / (this.gridDims.height),
        }
        let grid = this.subGridDimsFn(i,j,index)
        return {
            canvas,
            grid,
            cell:{
                width: canvas.width / grid.x,
                height: canvas.height / grid.y,
            },
            origin:{
                x: this.canvasDims.width * i / this.gridDims.width,
                y: this.canvasDims.height * j / this.gridDims.height,
            }
        }
    }

    public toSliceParams(i,j,index): SliceParams{
        return {
            offsets: {...this.rotationOffsetFn(i,j,index)},
            outline: this.outlineParams,

            // need to be renamed to represent rotation
            // slice offset is actually what this is setting
            rotation:(this.randomRotationParams.randomize) ? 
            ({
                randomize: this.randomRotationParams.randomize,
                values: this.randomRotationParams.values
            }) : 
            ({randomizeRotation: this.randomRotationParams.randomize}),
            scales: this.scalesFn(i,j,index),
            starts: this.startsFn(i,j,index),
            steps: this.stepsFn(i,j,index),
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
        return this.generatePaletteConfigs(this.colorPaletteNames,3).map((pk: PaletteConfig) => {
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



    // CONTROL FUNCTIONS====================================================
    private subGridDimsFn = (i,j,index): Point=>{
        // let dimIndex = Math.floor(Math.sqrt(i*i + j*j));
        let dimIndex = Math.floor(Math.random() * this.subGridDims.length);
        return this.subGridDims[dimIndex % this.subGridDims.length]; 
    }
    private scalesFn = (i,j,index): number[]=>{
        // let hyp = Math.floor(Math.sqrt(i*i + j*j));
        // let scaleIndex = Math.abs(
        //     Math.floor(
        //         Math.sin(-0.5* hyp) * subGridScales.length
        //     )
        // );
        let scaleIndex = i;
        return this.subGridScales[scaleIndex % this.subGridScales.length]
    }
    private startsFn = (i,j,index): number[]=>{
        return this.subGridStarts[i % this.subGridStarts.length]
    }
    private stepsFn = (i,j,index): number[]=>{
        return this.subGridSteps[i % this.subGridSteps.length]
    }
    private rotationOffsetFn = (i,j,index): SliceOffsets => {
        let rotIndex = Math.floor(Math.random() * this.rotationOffsets.length);
        return this.rotationOffsets[rotIndex % this.rotationOffsets.length];
    }

}