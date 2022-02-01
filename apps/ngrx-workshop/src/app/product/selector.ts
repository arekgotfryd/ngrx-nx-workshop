import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterParam } from '../router/selectors';
import { ProductState, productAdapter } from './reducer';
const { selectAll, selectEntities } = productAdapter.getSelectors();
export const getCurrentProductId = getRouterParam('productId');
export const getProductState = createFeatureSelector<ProductState>('product');
const getProductsState = createSelector(
  getProductState,
  state => state.products
);

export const getProducts = createSelector(getProductsState, selectAll);

export const getProductsEntities = createSelector(
  getProductsState,
  selectEntities
);

export const getCurrentProduct = createSelector(
  getProductsEntities,
  getCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products[id];
  }
);

export const getProductsCallState = createSelector(
  getProductState,
  state => state.productsCallState
);
