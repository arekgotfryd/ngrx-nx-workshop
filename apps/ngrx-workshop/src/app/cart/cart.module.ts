import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffects } from './effects';
import { cartReducer, CART_FEATURE_KEY } from './reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatSnackBarModule,
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule {}
