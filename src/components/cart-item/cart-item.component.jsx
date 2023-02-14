import { CartItemContainer, ItemDetails, CartImage } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CartItemContainer>
            <CartImage src={imageUrl} alt={`${name}`} />

            <ItemDetails>
                <span className="name">{name}</span>
                <span className="price">{quantity} x ${quantity * price}</span>
            </ItemDetails>

        </CartItemContainer>
    )
}

export default CartItem;