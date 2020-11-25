import { Injectable } from "@angular/core";
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArtEffects {
    public user$: Observable<any>;
    constructor( 
        private actions$: Actions,
    ){ 
 
    }

    // updateMapLocationAndTitleBySearch$ = createEffect((): any => {
    //     return this.actions$.pipe(
    //         ofType(ExplicitMapActions.UpdateSelectedMapBySearch),
    //         switchMap(({address,lat,lng}) => [
    //             ExplicitMapActions.SetSelectedMapLocation({
    //                 location: {
    //                     lat,
    //                     lng,
    //                     bounds: null,
    //                     zoom: DEFAULT_MAP_ZOOM,
    //                 }
    //             }),
    //             ExplicitMapActions.SetSelectedMapTitleText({
    //                 titleText: address,
    //             }),
    //         ])
    //     )   
    // });

};



