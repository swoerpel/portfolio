import { Cell, Dims, GridParams, Point, Rotation, SliceParams } from "./sketch.models";

import * as chroma from 'chroma.ts';
import { rotate, shuffle } from "./sketch.helpers";
import { colorMachineIndexFn } from "./sketch.params";
export class Lattice{

    private cellOrigins: Point[][];
    constructor(
        private graphic, 
        private gridParams: GridParams,
        private sliceParams: SliceParams,
        private color_machines: ((number)=>any)[],
    ) {
        this.refreshCellOrigins();
    }

    public drawNext(latticeIndex: number){
        this.refreshCellOrigins();
        let colorMachineIndex = 0;
        // should send scales in here
        let scales = [...this.sliceParams.scales];
        for(let i = 0; i < this.gridParams.grid.x; i++){
            for(let j = 0; j < this.gridParams.grid.y; j++){
                //====================================
                // could add offset matrix to control 
                // center placement on grid
                let center: Point = this.cellOrigins[i][j]
                //====================================
                // let cm = this.color_machines[colorMachineIndex % this.color_machines.length]
                let cmi = colorMachineIndexFn(
                    i,
                    j,
                    colorMachineIndex,
                    latticeIndex,
                    this.color_machines.length
                );
                let cm = this.color_machines[cmi]
                colorMachineIndex++;
                scales.forEach((scaleValue: number, d: number) => {
                    let cv = d / this.sliceParams.scales.length;
                    this.drawSlice({
                        dims: {
                            width: this.gridParams.cell.width * scaleValue,
                            height: this.gridParams.cell.height * scaleValue,
                        }, 
                        center, 
                        rotation: this.createRotation(i,j,d),
                        color: cm(cv).hex()
                    })
                })
            }
        }
        
    }
    
    private drawSlice(cell: Cell): void{
        let slice = this.generateSlicePoints(cell);
        this.graphic.fill(cell.color)
        this.graphic.beginShape();
        slice.forEach((p: Point)=> this.graphic.vertex(p.x,p.y));
        this.graphic.endShape('close');
        if(false){
            this.drawDebugPoints(slice);
        }
    }

    private generateSlicePoints({dims,rotation,center}: Cell): Point[]{
        let pointCount = 120;
        let step: number = rotation.stepRad / pointCount;
        let arc: Point[] = Array.from({length: pointCount + 1}, (_,i) => ({
            x: center.x + dims.width / 2 * Math.sin((i * step +  rotation.startRad)),
            y: center.y + dims.height / 2 * Math.cos((i * step + rotation.startRad)), 
        }));        
        arc.push(center)
        arc = arc.map((p:Point) => rotate(center, p, rotation.stepDeg))
        return arc
    }

    private createRotation(i,j,d): Rotation{
        if(this.sliceParams.rotation.randomize){
            return this.generateRandRotation();
        }
        let startAngle: number = this.sliceParams.starts[
            i % this.sliceParams.starts.length
        ] + (d * this.sliceParams.offsets.startRotation)// % 360, 
        let arcLength: number = this.sliceParams.steps[
            j % this.sliceParams.steps.length
        ] + (d * this.sliceParams.offsets.arcLength);// % 360
        return this.generateRotation(startAngle,arcLength)
    }

    private generateRotation(startAngle: number, arcLength: number): Rotation{
        return {
            startDeg: startAngle,
            stepDeg: arcLength,
            startRad: startAngle * Math.PI / 180,
            stepRad: (arcLength) * Math.PI / 180,
        }
    }

    private generateRandRotation(): Rotation{
        let rId1 = Math.floor(Math.random() * this.sliceParams.rotation.values.length);
        let rId2 = Math.floor(Math.random() * this.sliceParams.rotation.values.length);
        let r1 = this.sliceParams.rotation.values[rId1];
        let r2 = this.sliceParams.rotation.values[rId2];
        return {
            startDeg: r1,
            stepDeg: r1 + r2,
            startRad: r1 * Math.PI / 180,
            stepRad: (r1 + r2) * Math.PI / 180,
        }
    }

    private refreshCellOrigins(){
        this.graphic.stroke(this.sliceParams.outline.color);
        this.graphic.strokeWeight(this.gridParams.cell.width * this.sliceParams.outline.width)
        this.cellOrigins = true ? this.generateShuffledCenters() : this.generateOrderedCenters();
    }

    private generateShuffledCenters(){
        let index = 0;
        return shuffle(Array.from({length: this.gridParams.grid.x}, (_,i) => {
            return shuffle(Array.from({length: this.gridParams.grid.y}, (_,j) => 
                this.generateOrigin(i,j,index++)
            ));
        }));
    }

    private generateOrderedCenters(){
        let index = 0;
        return Array.from({length: this.gridParams.grid.x}, (_,i) => {
            return Array.from({length: this.gridParams.grid.y}, (_,j) => 
                this.generateOrigin(i,j,index++)
            );
        });
    }

    private generateOrigin = (i,j,index) => ({
        x: i * this.gridParams.cell.width + 
            this.gridParams.cell.width / 2 + 
            this.gridParams.origin.x,
        y: j * this.gridParams.cell.height + 
            this.gridParams.cell.height / 2 +
            this.gridParams.origin.y,
        index,
    });

    private drawDebugPoints(slice: Point[]): void {
        this.graphic.textSize(120)
        this.graphic.textAlign('center', 'center')
        slice.forEach((p: Point, i: number)=> {
            this.graphic.stroke('white');
            this.graphic.strokeWeight(4);
            this.graphic.text(i.toString(), p.x,p.y)
            this.graphic.stroke(chroma.color('white').hex());
            this.graphic.strokeWeight(20);
            this.graphic.point(p.x,p.y)
        });
    }



 


  


}

