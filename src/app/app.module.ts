import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageSectionsModule } from './page-sections/page-sections.module';
import { AbilitiesComponent } from './page-sections/abilities/abilities.component';
import { ContactComponent } from './page-sections/contact/contact.component';
import { ExperiencesComponent } from './page-sections/experiences/experiences.component';
import { LandingComponent } from './page-sections/landing/landing.component';
import { ProfileComponent } from './page-sections/profile/profile.component';
import { ProjectsComponent } from './page-sections/projects/projects.component';
import { InteractiveComponent } from './page-sections/interactive/interactive.component';

import { HeaderComponent } from './components/header/header.component';
import { SketchComponent } from './components/sketch/sketch.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { artReducer } from './state/art.reducer';
import { ArtEffects } from './state/art.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



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
    PageSectionsModule,
    StoreModule.forRoot({
      art: artReducer,
    }, {}),
    EffectsModule.forRoot([
      ArtEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'art',
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
