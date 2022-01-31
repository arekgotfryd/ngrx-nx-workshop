import { Product } from 'libs/api-interfaces/src/lib/api-interfaces';
import { BasicProduct } from '@ngrx-nx-workshop/api-interfaces';
// product-details/actions.ts
import { createAction, props } from '@ngrx/store';
import { ProductState } from '../reducer';

export const addToCart = createAction(
  '[Product Details Page] Add to cart button clicked',
  props<{ productId: string }>()
);

export const productDetailsOpened = createAction(
  '[Product Details Page] Opened'
);

export const productFetchedSuccess = createAction(
  '[Product Details Page] product fetch success',
  props<{product: Product}>()
);

export const productFetchedError = createAction(
  '[Product Details Page] product fetch error'
);
