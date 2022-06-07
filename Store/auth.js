import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	isLoggedOut: true,
};

export const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		loggedIn: (state, actions) => {
			state.isLoggedOut = false;
		},
		loggedOut: (state, actions) => {
			state.isLoggedOut = true;
		},
	},
});

export const {loggedIn, loggedOut} = authSlice.actions;

export default authSlice.reducer;
