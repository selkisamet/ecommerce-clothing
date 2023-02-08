import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

// addCartItem: Sepet öğesi ekle.
// cartItems: Sepet öğeleri.
// productToAdd: Eklenecek ürün.
const addCartItem = (cartItems, productToAdd) => {
    // Sepette eklenecek ürün ile eşleşen ürün olup olmadığnı kontrol et.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // Sepette eşleşen ürün varsa adetini 1 arttır.
    if (existingCartItem) {
        return cartItems.map((cartItem) => (
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ));
    }

    // Değiştirilmiş sepet öğeleri ile yeni dizi döndür.
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

// export const CartContext = createContext();

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);

        setCartCount(newCartCount)
    }, [cartItems]);

    // addItemToCart: Sepete ürün ekle.
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
