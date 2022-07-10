import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	service: "",
	gender_preference: "",
	job_type: "",
	salary: "",
	descriptions: "",
};

export const postJobSlice = createSlice({
	name: "saving data when posting new job",
	initialState,
	reducers: {
		homeAssistant: (state, actions) => {
			state.service = "home_assistant";
		},
		homeCleaning: (state, actions) => {
			state.service = "home_cleaning";
		},
		homeCooking: (state, actions) => {
			console.log("====================================");
			console.log("passed here");
			console.log("====================================");
			state.service = "home_cooking";
		},
		homeBabySitter: (state, actions) => {
			state.service = "home_baby_sitter";
		},
		deleteService: (state, actions) => {
			Object.assign(state, initialState);
		},
		malePreference: (state, actions) => {
			state.gender_preference = "male";
		},
		femalePrefence: (state, actions) => {
			state.gender_preference = "female";
		},
		anyGender: (state, actions) => {
			state.gender_preference = "any-gender";
		},
		deleteGenderPreference: (state, actions) => {
			state.gender_preference = "";
		},
		fulltimeType: (state, actions) => {
			state.job_type = "full-time";
		},
		partTimeType: (state, actions) => {
			state.job_type = "part-time";
		},
		deleteType: (state, actions) => {
			state.job_type = "";
		},
		saveSalary: (state, actions) => {
			state.salary = actions.payload;
		},
		deleteSalary: (state, actions) => {
			state.salary = "";
		},
		restorePost: (state, actions) => {
			Object.assign(state, initialState);
		},
	},
});

export const {
	homeAssistant,
	homeBabySitter,
	homeCleaning,
	homeCooking,
	deleteService,
	malePreference,
	femalePrefence,
	anyGender,
	deleteGenderPreference,
	partTimeType,
	fulltimeType,
	deleteType,
	saveSalary,
	deleteSalary,
	restorePost,
} = postJobSlice.actions;

export default postJobSlice.reducer;
