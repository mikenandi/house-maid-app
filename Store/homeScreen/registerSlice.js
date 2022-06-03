import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	role: "",
	firstName: "",
	lastName: "",
	gender: "",
	phoneNumber: "",
	email: "",
	password: "",
	location: {
		region: "",
		district: "",
		ward: "",
		street: "",
	},
	birthDate: "",
};

export const registerSlice = createSlice({
	name: "store for registration details",
	initialState,
	reducers: {
		roleMaid: (state, actions) => {
			state.role = "maid";
		},
		roleEmployer: (state, actions) => {
			state.role = "employer";
		},
	},
});

export const {roleMaid, roleEmployer} = registerSlice.actions;

export default registerSlice.reducer;
