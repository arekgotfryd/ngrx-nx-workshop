import { getCartProducts, getCartTotal } from './../selectors';
import * as actions from './actions';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CartProduct } from '../../model/product';
import { CartService } from '../cart.service';
import { ProductService } from '../../product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'ngrx-nx-workshop-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  cartProducts$ = this.store.select(getCartProducts);
  total$ = this.store.select(getCartTotal);

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.pageOpened());
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(
        products.map(({ id, quantity }) => ({ productId: id, quantity }))
      )
      // 👇 really important not to forget to subscribe
      .subscribe(isSuccess => {
        if (isSuccess) {
          this.cartService.getCartProducts();
          this.store.dispatch(actions.purchaseSuccess());
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500
          });
        }
      });
  }
}
