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
	password: "",
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
		roleAgent: (state, actions) => {
			state.role = "agent";
		},
		saveName: (state, actions) => {
			state.firstName = actions.payload.first_name;
			state.lastName = actions.payload.last_name;
		},
		deleteName: (state, actions) => {
			state.firstName = "";
			state.lastName = "";
		},
		savePersonal: (state, actions) => {
			state.birthDate = actions.payload.birthDate;
			state.gender = actions.payload.gender;
		},
		deletePersonal: (state, actions) => {
			state.birthDate = "";
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
		savePassword: (state, actions) => {
			state.password = actions.payload;
		},
		deletePassword: (state, actions) => {
			state.password = "";
		},
	},
});

export const {
	roleMaid,
	roleEmployer,
	roleAgent,
	saveName,
	deleteName,
	savePersonal,
	deletePersonal,
	deleteLocation,
	saveLocation,
	saveContacts,
	deleteContacts,
	savePassword,
	deletePassword,
} = registerSlice.actions;

export default registerSlice.reducer;
