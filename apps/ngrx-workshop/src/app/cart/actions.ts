import { createAction, props } from '@ngrx/store';
import { CartItem } from 'libs/api-interfaces/src/lib/api-interfaces';

export const timerTick = createAction('[Cart Effects] perioding timer tick');
export const addToCartSuccess = createAction('[Cart API] add to cart success');
export const addToCartError = createAction('[Cart API] add to cart error',props<{productId:string}>());

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction('[Cart API] fetch items error');
