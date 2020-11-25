import { linSet } from "./sketch.helpers";
import { Dims, Point, SliceOffsets } from "./sketch.models";

export const paletteNames = ["OrRd","PuBu","BuPu","Oranges","BuGn","YlOrBr","YlGn","Reds","RdPu","Greens","YlGnBu","Purples","GnBu","Greys","YlOrRd","PuRd","Blues","PuBuGn","Viridis","Spectral","RdYlGn","RdBu","PiYG","PRGn","RdYlBu","BrBG","RdGy","PuOr","Set2","Accent","Set1","Set3","Dark2","Paired","Pastel2","Pastel1"];
export const frameRate = 30;

let len = 400;
export const canvasDims = {
    width: len*2,
    height: len,
    border: {
        x: 20,
        y: 20,
    }
}
export const defaultColors = {
    background: 'black'
}


export const colorPaletteNames: string[] = [
    paletteNames[Math.floor(Math.random() * paletteNames.length)],
    paletteNames[Math.floor(Math.random() * paletteNames.length)],
    paletteNames[Math.floor(Math.random() * paletteNames.length)],
    // 'rdylbu',
    // 'animo'
    // "Greys",
    // "Spectral",
    // "YlOrRd",
]


console.log('colorPaletteNames',colorPaletteNames)
export const outlineParams = {
    width: 0.00,
    color: 'black'
}
export const rotationParams = {
    randomize: false,
    values: [45,90,135]
}
export const gridDims: Dims = {
    width:4,
    height:2,
}
export const subGridDims: Point[] = [
    {x:1,y:1},
    {x:2,y:2},
    {x:4,y:4},
]
export const subGridScales: number[][] = [
    [1,.9,.8,.7,.6,.5,.4],
    // [Math.sqrt(2),1,1-(Math.sqrt(2)-1)],
]

// ===========EXPERIMENTAL ARRAY GENERATION================
// let count = 1; // stays simple when kept at 1
// let start = 3;
// let cutoff = 0.1;
// export const subGridScales: number[][] = 
//     Array.from({length: count},(_,i)=>{
//         let l = i+start;
//         let s = 1/l;
//         l-=Math.floor(l*cutoff)
//         return Array.from({length: l},(_,j) =>(1-j*s))
//     });
// ========================================================

export const subGridStarts: number[][] = [
    [0,45,90],
    [90,180],
    [180,270],
    // [270],
]
export const subGridSteps: number[][] = [
    [90,180,360],
    [135],
    [180],
    [270],
    [315],
    [360],
    // [90,180],
    // [90,180],
]

export const rotationOffsets: SliceOffsets[] = Array.from(
    {length: 20}, (_,i) => ({
        startRotation: 0, 
        arcLength:0
    })
);


//======= functions ========
// Parameter Aggregator
export const subGridDimsFn = (i,j,index): Point=>{
    // let dimIndex = Math.floor(Math.sqrt(i*i + j*j));
    let dimIndex = Math.floor(Math.random() * subGridDims.length);
    return subGridDims[dimIndex % subGridDims.length]; 
}
export const scalesFn = (i,j,index): number[]=>{
    // let hyp = Math.floor(Math.sqrt(i*i + j*j));
    // let scaleIndex = Math.abs(
    //     Math.floor(
    //         Math.sin(-0.5* hyp) * subGridScales.length
    //     )
    // );
    let scaleIndex = i;
    return subGridScales[scaleIndex % subGridScales.length]
}
export const startsFn = (i,j,index): number[]=>{
    return subGridStarts[i % subGridStarts.length]
}
export const stepsFn = (i,j,index): number[]=>{
    return subGridSteps[i % subGridSteps.length]
}
export const rotationOffsetFn = (i,j,index): SliceOffsets => {
    let rotIndex = Math.floor(Math.random() * rotationOffsets.length);
    return rotationOffsets[rotIndex % rotationOffsets.length];
}

// Lattice
export const colorMachineIndexFn = (i,j,index,latticeIndex,colorMachineCount) => {
    let cmi = Math.floor(Math.random() * colorMachineCount);
    // cmi = latticeIndex % colorMachineCount;
    return cmi;
}
