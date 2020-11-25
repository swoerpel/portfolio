import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArtState } from '../art.reducer';

const artFeatureState = createFeatureSelector<ArtState>('art');

export const GetParams = createSelector(
    artFeatureState,
    (state: ArtState): any => state.params
)
