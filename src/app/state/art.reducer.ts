import { createReducer, on } from "@ngrx/store";
import { makeid } from '../components/sketch/sketch.helpers';
import { Dims, Point, SliceOffsets, SubGridParams } from '../components/sketch/sketch.models';
import { COLOR_PALETTE_NAMES } from '../shared/constants';
import { ArtActions } from "./actions";

const defaultArtId = makeid();

export interface ArtState {
    params: any;
}

const initialState: ArtState = {
    params: null,
}

export const artReducer = createReducer<ArtState>(
    initialState,

    on(ArtActions.ParamsRefreshed, (state, action): ArtState => {
        return {
            ...state,
            params: action.params,
        }
    }),

);