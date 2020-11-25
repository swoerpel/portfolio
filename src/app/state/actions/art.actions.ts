import {createAction, props} from '@ngrx/store';


export const NULL = createAction(
    '[Explicit Map] NULL',
)


// Map Display Widget
export const RefreshParams = createAction(
    '[Art Action] Refresh Params',
    props<{key: string;}>()
)
// Map Display Widget
export const ParamsRefreshed = createAction(
    '[Art Action] Params Refreshed',
    props<{params: any;}>()
)
