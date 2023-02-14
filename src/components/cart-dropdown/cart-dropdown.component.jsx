import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.style.jsx";

const CartDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpen(!isCartOpen);
        navigate("/checkout");
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? cartItems.map(item => <CartItem key={item.id} cartItem={item} />) : <EmptyMessage>Your cart is empty.</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown