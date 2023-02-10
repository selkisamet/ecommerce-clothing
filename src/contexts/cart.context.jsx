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

// removeCartItem: Sepet öğesini kaldır.
// cartItems: Sepet öğeleri.
// productToRemove: Kaldırılacak ürün.
const removeCartItem = (cartItems, productToRemove) => {
    // Sepetten kaldırılacak ürün ile eşleşen ürün olup olmadığnı kontrol et.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    // Eşleşen ürün sayısı 1'e eşitse ve gelen ürün, sepetteki ürünler ile eşleşmiyorsa sepetten kaldır.
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => (
            cartItem.id !== productToRemove.id
        ));
    }

    // Sepette eşleşen ürün varsa adetini 1 azalt.
    return cartItems.map((cartItem) => (
        cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ));
}

// removeCartItem: Sepet öğesini temizle.
// cartItems: Sepet öğeleri.
// cartItemToClear: Temizlenecek ürün.
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => (
        cartItem.id !== cartItemToClear.id
    ));
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);

        setCartCount(newCartCount)
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0);

        setCartTotal(newCartTotal)
    }, [cartItems]);

    // addItemToCart: Sepete ürün ekle.
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    // removeItemToCart: Sepeteki ürünü kaldır.
    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    // clearItemFromCart: Sepetten ürünü temizle.
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
