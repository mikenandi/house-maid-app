import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
	password: "",
};

export const registerMaidSlice = createSlice({
	name: "store for registration details",
	initialState,
	reducers: {
		saveName: (state, actions) => {
			state.firstName = actions.payload.first_name;
			state.lastName = actions.payload.last_name;
		},
		deleteName: (state, actions) => {
			state.firstName = "";
			state.lastName = "";
		},
		saveBirdthDate: (state, actions) => {
			state.birthDate = actions.payload;
		},
		deleteBirthDate: (state, actions) => {
			state.birthDate = "";
		},
		saveGender: (state, actions) => {
			state.gender = actions.payload;
		},
		deleteGender: (state, actions) => {
			state.gender = "";
		},
		saveLocation: (state, actions) => {
			state.location.region = actions.payload.region;
			state.location.district = actions.payload.district;
			state.location.ward = actions.payload.ward;
			state.location.street = actions.payload.street;
		},
		deleteLocation: (state, actios) => {
			Object.assign(state.location, initialState.location);
		},
		saveContacts: (state, actions) => {
			state.email = actions.payload.email;
			state.phoneNumber = actions.payload.phone_number;
		},
		deleteContacts: (state, actions) => {
			state.email = "";
			state.phoneNumber = "";
		},
	},
});

export const {
	saveName,
	deleteName,
	saveBirdthDate,
	saveGender,
	deleteBirthDate,
	deleteGender,
	deleteLocation,
	saveLocation,
	saveContacts,
	deleteContacts,
} = registerMaidSlice.actions;

export default registerMaidSlice.reducer;
