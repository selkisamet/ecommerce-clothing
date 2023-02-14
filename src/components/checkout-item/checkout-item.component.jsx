import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemToCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
    }

    const addItemHandler = () => {
        addItemToCart(cartItem)
    }

    const removeItemHandler = () => {
        removeItemToCart(cartItem);
    }

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>

            <BaseSpan>{name}</BaseSpan>

            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                {quantity}
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>${quantity * price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;