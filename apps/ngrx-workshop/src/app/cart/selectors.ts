import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { getProducts } from './../product/selector';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CART_FEATURE_KEY } from './reducer';

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const getCartItems = createSelector(
  cartFeature,
  state => state.cartItems
);

export const getCartItemsCount = createSelector(getCartItems, cartItems =>
  cartItems
    ? Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0)
    : 0
);

export const getCartProducts = createSelector(
  getCartItems,
  getProducts,
  (cartItems, products) => {
    if (!cartItems || !products) return [];
    return Object.entries(cartItems).map(([key]) => {
      return products.find(product => {
        return product.id === key;
      });
    });
  }
);

export const getCartTotal = createSelector(
  getCartProducts,
  getCartItems,
  (cartProducts, cartItems) => {
    if (!cartItems || !cartProducts) return 0;
    return cartProducts
      .map((product: BasicProduct | undefined) => {
        //single product total
        return product!.price * cartItems[product!.id];
      })
      .reduce((acc, productTotal) => acc + productTotal, 0);
  }
);
