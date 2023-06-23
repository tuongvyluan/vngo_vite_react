import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tour: []
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			console.log(action.payload);
			state.tour = action.payload;
		},
		emptyCart: (state, action) => {
			state.tour = [];
		}
	}
});

export const { addToCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
