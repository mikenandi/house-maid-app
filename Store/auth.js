import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	isLoggedOut: true,
	userId: "",
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
		saveUserId: (state, actions) => {
			state.userId = actions.payload;
		},
	},
});

export const {loggedIn, loggedOut, saveUserId} = authSlice.actions;

export default authSlice.reducer;
