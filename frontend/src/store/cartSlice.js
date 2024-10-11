import { createSlice } from '@reduxjs/toolkit';

// Hàm để lưu giỏ hàng vào localStorage
const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Hàm để lấy giỏ hàng từ localStorage
const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getCartFromLocalStorage(), // Khởi tạo state từ localStorage
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCartToLocalStorage(state.items); // Lưu lại giỏ hàng vào localStorage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(state.items); // Lưu lại giỏ hàng vào localStorage
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            saveCartToLocalStorage(state.items); // Lưu lại giỏ hàng vào localStorage
        },
        resetCart: (state) => {
            state.items = []; // Đặt lại giỏ hàng về rỗng
            saveCartToLocalStorage(state.items); // Cập nhật localStorage
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
