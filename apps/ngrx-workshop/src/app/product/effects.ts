import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { productsFetchedSuccess, productsFetchedError } from './actions';
import * as productListActions from './product-list/actions';
import * as cartDetailsActions from '../cart/cart-details/actions';
import * as apiActions from './actions';
import { ProductService } from './product.service';
import {
  productDetailsOpened,
  productFetchedError,
  productFetchedSuccess
} from './product-details/actions';
import { getCurrentProductId, getProductsCallState } from './selector';
import { Store } from '@ngrx/store';
import { getCallStateError } from '../shared/call_state';

@Injectable()
export class ProductEffects {
  constructor(
    private snackBar: MatSnackBar,
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private store: Store
  ) {}

  readonly fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened, cartDetailsActions.pageOpened),
      map(() => {
        apiActions.productsFetch();
      }),
      exhaustMap(() => {
        return this.productService.getProducts().pipe(
          map(products => productsFetchedSuccess({ products })),
          catchError(() => of(productsFetchedError()))
        );
      })
    )
  );

  fetchCurrentProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productDetailsOpened),
      withLatestFrom(this.store.select(getCurrentProductId)),
      switchMap(([, id]) =>
        this.productService.getProduct(id!).pipe(
          map(product => productFetchedSuccess({ product })),
          catchError(() => of(productFetchedError()))
        )
      )
    )
  );

  readonly fetchProductsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(productsFetchedError),
        withLatestFrom(this.store.select(getProductsCallState)),
        tap(([, callState]) => {
          console.log(getCallStateError(callState));
          this.snackBar.open(getCallStateError(callState)!, 'Error', {
            duration: 2500
          });
        })
      ),
    { dispatch: false }
  );
}
