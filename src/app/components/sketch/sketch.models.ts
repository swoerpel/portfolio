export interface Point {
    x: number;
    y: number;
    cm?: any; // move into superclass
}

export interface Cell {
    dims: Dims;
    center: Point;
    rotation: Rotation;
    color?: string;
}

export interface Dims{
    width: number;
    height: number;
}

export interface Rotation {
    startDeg: number;
    stepDeg: number;
    startRad: number;
    stepRad: number;
}

export interface Radius {
    x0?: number;
    y0?: number;
    x1?: number;
    y1?: number;
}

export interface PaletteConfig {
    key: string;
    reversed: boolean;
    rotate: number;
}

export interface GridParams{
    canvas: Dims;
    grid: Point;
    cell:Dims;
    origin: Point;
}

export interface SliceParams{
    offsets:SliceOffsets;
    outline: any;
    rotation: any;
    scales: number[];
    starts: number[];
    steps: number[];
}

export interface SliceOffsets {
    startRotation: number;
    arcLength: number;
}

export interface SubGridParams{
    grid: GridParams;
    slice: SliceParams;
}