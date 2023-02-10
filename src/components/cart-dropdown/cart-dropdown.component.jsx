import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import "./cart-dropdown.style.scss";

const CartDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpen(!isCartOpen);
        navigate("/checkout");
    }

    return (
        <div className="cart-dropdown-container">
            <div className="card-item">
                {
                    cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
                }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown