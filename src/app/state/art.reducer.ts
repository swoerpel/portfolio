import { createReducer, on } from "@ngrx/store";
import { ArtActions } from "./actions";

export interface ArtState {
}

const initialState: ArtState = {
}

export const artReducer = createReducer<ArtState>(
    initialState,

    on(ArtActions.NULL, (state, action): ArtState => {
        return {
            ...state,
        }
    }),

);