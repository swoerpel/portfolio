import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from './components/components.module';
import { PageSectionsModule } from './page-sections/page-sections.module';
import { AbilitiesComponent } from './page-sections/abilities/abilities.component';
import { ContactComponent } from './page-sections/contact/contact.component';
import { ExperiencesComponent } from './page-sections/experiences/experiences.component';
import { LandingComponent } from './page-sections/landing/landing.component';
import { ProfileComponent } from './page-sections/profile/profile.component';
import { ProjectsComponent } from './page-sections/projects/projects.component';
import { HeaderComponent } from './components/header/header.component';
import { SketchComponent } from './components/sketch/sketch.component';
import { InteractiveComponent } from './page-section/interactive/interactive.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ProfileComponent,
    ExperiencesComponent,
    AbilitiesComponent,
    ProjectsComponent,
    ContactComponent,
    SketchComponent,
    InteractiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    PageSectionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
