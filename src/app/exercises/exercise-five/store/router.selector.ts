import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';

const selectRouter = createFeatureSelector<RouterReducerState>('router');

const {
    selectCurrentRoute,
    selectRouteParams,
    selectQueryParams,
    selectRouteParam,
    selectQueryParam,
    selectFragment,
    selectTitle
} = getRouterSelectors(selectRouter);

// ✅ :id route param
export const selectIdParam = selectRouteParam('userId');

// ✅ ?tab=query param
export const selectTabQueryParam = selectQueryParam('tab');

// ✅ All route params (object of all :params)
export const selectAllRouteParams = selectRouteParams;

// ✅ All query params (?key=value)
export const selectAllQueryParams = selectQueryParams;

// ✅ Route fragment (#section1)
export const selectRouteFragment = selectFragment;

// ✅ Page title (if defined in route data)
export const selectRouteTitle = selectTitle;

// ✅ Route config path ('projects/view/:id')
export const selectRoutePath = createSelector(
    selectCurrentRoute,
    route => route?.routeConfig?.path
);

// ✅ Route URL path segments (e.g. ['projects', 'view', '123'])
export const selectRouteSegments = createSelector(
    selectCurrentRoute,
    (route) => route?.url?.map((segment: any) => segment.path) || []
);

