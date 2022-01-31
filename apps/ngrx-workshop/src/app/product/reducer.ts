import { productsFetchedError, productsFetchedSuccess } from './actions';
import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { productFetchedSuccess } from './product-details/actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductState {
  products: EntityState<Product>;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState()
};

export const productsReducer = createReducer(
  initState,
  on(productsFetchedSuccess, (state, { products }) => {
    return {
      ...state,
      products: productAdapter.upsertMany(products, state.products)
    };
  }),
  on(productFetchedSuccess, (state, { product }) => {
    return {
      ...state,
      products: productAdapter.upsertOne(product,state.products)
    };
  })
);
