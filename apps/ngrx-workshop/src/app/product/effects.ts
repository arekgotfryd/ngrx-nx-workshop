import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { productsFetchedSuccess, productsFetchedError } from './actions';
import * as productListActions from './product-list/actions';
import * as cartDetailsActions from '../cart/cart-details/actions';
import { ProductService } from './product.service';
import {
  productDetailsOpened,
  productFetchedError,
  productFetchedSuccess
} from './product-details/actions';
import { getCurrentProductId } from './selector';
import { Store } from '@ngrx/store';

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
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map(products => productsFetchedSuccess({ products })),
          catchError(() => of(productsFetchedError()))
        )
      )
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
        tap(() => {
          console.log('fetching error');
          this.snackBar.open('Error fething products', 'Error', {
            duration: 2500
          });
        })
      ),
    { dispatch: false }
  );
}
