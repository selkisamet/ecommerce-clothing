import React from "react";
import "./cart-dropdown.style.scss";
import Button from "../button/button.component";

const CartDropdown = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="card-item"></div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown