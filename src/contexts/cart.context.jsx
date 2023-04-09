import React, { useReducer } from 'react';
import { createContext } from 'react';
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error("Unhandled type of" + type + "in cartReducer");
    }
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }));
    }

    // addItemToCart: Sepete ürün ekle.
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    // removeItemToCart: Sepeteki ürünü kaldır.
    const removeItemToCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    // clearItemFromCart: Sepetten ürünü temizle.
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
