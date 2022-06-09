import {createSlice} from "@reduxjs/toolkit";
import {modalSlice} from "./modalSlice";

const initialState = {
	nameForm: false,
	locationForm: false,
	contactsForm: false,
	birthdateForm: false,
};

const agentModalSlice = createSlice({
	name: "modals for registering maid",
	initialState,
	reducers: {
		showNameForm: (state, actions) => {
			state.nameForm = true;
		},
		showLocationForm: (state, actions) => {
			state.locationForm = true;
		},
		showContactForm: (state, actions) => {
			state.contactsForm = true;
		},
		hideNameForm: (state, actions) => {
			state.nameForm = false;
		},
		hideLocationForm: (state, actions) => {
			state.locationForm = false;
		},
		hideContactsForm: (state, actions) => {
			state.contactsForm = false;
		},
		showBirthDateForm: (state, actions) => {
			state.birthdateForm = true;
		},
		hideBirthDateForm: (state, actions) => {
			state.birthdateForm = false;
		},
		hideAllRegisterMaidModals: (state, actions) => {
			state.contactsForm = false;
			state.nameForm = false;
			state.locationForm = false;
			state.birthdateForm = false;
		},
	},
});

export const {
	showNameForm,
	showContactForm,
	showLocationForm,
	hideContactsForm,
	hideLocationForm,
	hideNameForm,
	hideAllRegisterMaidModals,
	showBirthDateForm,
	hideBirthDateForm,
} = agentModalSlice.actions;

export default agentModalSlice.reducer;
