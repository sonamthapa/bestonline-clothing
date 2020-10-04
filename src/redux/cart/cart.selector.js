//if the property from state have same value it doesnot pass prop to components
//and react will not re-render
import { createSelector } from 'reselect';

//input selector does not use createselector
//get whole state and returns slice of it
const selectCart = state => state.cart;

//output selector that use both input selector and create selector to build themselves
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);
export const selectCartItemsCount = createSelector(
    [selectCartItems], 
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity , 0)
    
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price , 0)
)