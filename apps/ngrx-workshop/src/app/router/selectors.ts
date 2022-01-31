import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, MinimalRouterStateSnapshot, getSelectors} from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export const routerFeatureState = createFeatureSelector<
 RouterReducerState<MinimalRouterStateSnapshot>
>(ROUTER_FEATURE_KEY);

export const getRouterParam = getSelectors(routerFeatureState).selectRouteParam;

// const {
//   selectQueryParams,    // select the current route query params
//   selectQueryParam,     // factory function to select a query param
//   selectRouteParams,    // select the current route params
//   selectRouteParam,     // factory function to select a route param
//   selectRouteData,      // select the current route data
//   selectUrl,            // select the current url
//  } = getSelectors(routerFeatureState);
