import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SketchComponent } from './sketch/sketch.component';



@NgModule({
  declarations: [
    NavigationComponent,
    // SketchComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
