import { getCurrentProduct, getCurrentProductId } from './../selector';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { addToCart, productDetailsOpened } from './actions';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product$ = this.store.select(getCurrentProduct);

  private readonly subscription = new Subscription();

  private customerRating$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly ratingService: RatingService,
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(productDetailsOpened());
    this.subscription.add(
      this.store
        .select(getCurrentProductId)
        .pipe(
          filter((id): id is string => !!id),
          switchMap(id => this.ratingService.getRating(id))
        )
        .subscribe(productRating =>
          this.customerRating$.next(productRating && productRating.rating)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map(arr =>
          arr.find(productRating => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map(productRating => productRating.rating)
      )
      .subscribe(newRating => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(addToCart({ productId }));
  }

  back() {
    this.location.back();
  }
}
