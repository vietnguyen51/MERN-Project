import { createSlice } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getCartFromLocalStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCartToLocalStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => !(item.id === action.payload.id && item.size === action.payload.size));
            saveCartToLocalStorage(state.items);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            saveCartToLocalStorage(state.items);
        },
        resetCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state.items);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
