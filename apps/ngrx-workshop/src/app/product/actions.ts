import { createAction, props } from '@ngrx/store';
import { BasicProduct, Product } from 'libs/api-interfaces/src/lib/api-interfaces';

export const productsFetchedSuccess = createAction(
  '[Products API] fetched success',
  props<{ products: Product[] }>()
);
export const productsFetchedError = createAction(
  '[Products API] error'
);
