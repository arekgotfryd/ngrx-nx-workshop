import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of, timer } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';
import { addToCart } from '../product/product-details/actions';
import { addToCartSuccess, addToCartError } from './actions';
const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; //20 seconds

@Injectable()
export class CartEffects {
  constructor(
    private snackBar: MatSnackBar,
    private readonly actions$: Actions,
    private readonly cartService: CartService
  ) {}

  fetchCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartService.getCartProducts().pipe(
          map(cartItems => actions.fetchCartItemsSuccess({ cartItems })),
          catchError(() => of(actions.fetchCartItemsError()))
        )
      )
    );
  });

  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToCart),
      mergeMap(({ productId }) =>
        this.cartService.addProduct(productId).pipe(
          map(() => addToCartSuccess()),
          catchError(() => of(addToCartError({ productId })))
        )
      )
    );
  });

  init$ = createEffect(() =>
    defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    )
  );

  readonly addToCartError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCartError),
        tap(() => {
          console.log('fetching error');
          this.snackBar.open('Error while adding to cart', 'Error', {
            duration: 2500
          });
        })
      ),
    { dispatch: false }
  );
}
