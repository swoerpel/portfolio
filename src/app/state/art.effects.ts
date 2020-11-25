import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ArtActions } from './actions';
import { head, last, tail } from 'lodash';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { SketchService } from '../services/sketch.service'; 

@Injectable({
    providedIn: 'root'
})
export class ArtEffects {
    public user$: Observable<any>;
    constructor( 
        private actions$: Actions,
        private sketchService: SketchService,
    ){ 
 
    }

    updateMapLocationAndTitleBySearch$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT,ArtActions.RefreshParams),
            switchMap(({key}) => 
                of(ArtActions.ParamsRefreshed(
                    {params: this.sketchService.getParameterSet(key)}
                ))
            )
        )   
    });

};



