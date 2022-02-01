import { productsFetch, productsFetchedError, productsFetchedSuccess } from './actions';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { productFetchedSuccess } from './product-details/actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  CallState,
  getCallStateError,
  ResultState
} from '../shared/call_state';

export interface ProductState {
  products: EntityState<Product>;
  productsCallState: CallState;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  productsCallState: ResultState.INIT
};

export const productsReducer = createReducer(
  initState,
  on(productsFetchedSuccess, (state, { products }) => {
    return {
      ...state,
      products: productAdapter.upsertMany(products, state.products),
      productsCallState: ResultState.LOADED
    };
  }),
  on(productsFetchedError, (state) => {
    return {
      ...state,
      productsCallState: {errorMsg: 'Failed loading products'}
    };
  }),
  on(productFetchedSuccess, (state, { product }) => {
    return {
      ...state,
      products: productAdapter.upsertOne(product, state.products)
    };
  }),
  on(productsFetch, (state) => {
    return {
      ...state,
      productsCallState: ResultState.LOADING
    };
  })
);
