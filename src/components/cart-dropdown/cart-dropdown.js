import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { toggleCartHidden } from '../../redux/cart/cart.action';

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            { 
                cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
        </div>
            <Button onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</Button>
        
    </div>
)
//createStructured give acces to global state and automatically pass state
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});
//connect --> HOC pass dispatch props to components
export default withRouter(connect(mapStateToProps)(CartDropdown));