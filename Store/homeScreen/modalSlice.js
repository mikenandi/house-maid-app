import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	descriptionVisible: false,
	searchVisible: false,
	profileVisible: false,
	notificationVisible: false,
	postVisible: false,
	genderPreferenceVisible: false,
	jobTypeVisible: false,
	salaryVisible: false,
	postDescVisible: false,
	postedJobsVisible: false,
};

export const modalSlice = createSlice({
	name: "slice for controlling modals",
	initialState,
	reducers: {
		showDescription: (state, actions) => {
			state.descriptionVisible = true;
		},
		hideDescription: (state, actions) => {
			state.descriptionVisible = false;
		},
		showSearch: (state, actions) => {
			state.searchVisible = true;
		},
		hideSearch: (state, actins) => {
			state.searchVisible = false;
		},
		showProfile: (state, actions) => {
			state.profileVisible = true;
		},
		hideProfile: (state, actions) => {
			state.profileVisible = false;
		},
		showNofication: (state, actions) => {
			state.notificationVisible = true;
		},
		hideNotification: (state, actions) => {
			state.notificationVisible = false;
		},
		showPost: (state, actions) => {
			state.postVisible = true;
		},
		hidePost: (state, actions) => {
			state.postVisible = false;
		},
		showGenderPreference: (state, actions) => {
			state.genderPreferenceVisible = true;
		},
		hideGenderPreference: (state, actions) => {
			state.genderPreferenceVisible = false;
		},
		showJobType: (state, actions) => {
			state.jobTypeVisible = true;
		},
		hideJobType: (state, actions) => {
			state.jobTypeVisible = false;
		},
		showSalary: (state, actions) => {
			state.salaryVisible = true;
		},
		hideSalary: (state, actions) => {
			state.salaryVisible = false;
		},
		showPostDesc: (state, actions) => {
			state.postDescVisible = true;
		},
		hidePostDesc: (state, actions) => {
			state.postDescVisible = false;
		},
		hidePostModals: (state, actions) => {
			state.postVisible = false;
			state.jobTypeVisible = false;
			state.genderPreferenceVisible = false;
			state.postDescVisible = false;
			state.salaryVisible = false;
		},
		showPostedJobs: (state, actions) => {
			state.postedJobsVisible = true;
		},
		hidePostedJobs: (state, actions) => {
			state.postedJobsVisible = false;
		},
	},
});

export const {
	showDescription,
	hideDescription,
	showProfile,
	showSearch,
	hideProfile,
	hideSearch,
	showNofication,
	hideNotification,
	showPost,
	hidePost,
	showGenderPreference,
	hideGenderPreference,
	showJobType,
	hideJobType,
	showSalary,
	hideSalary,
	showPostDesc,
	hidePostDesc,
	hidePostModals,
	showPostedJobs,
	hidePostedJobs,
} = modalSlice.actions;

export default modalSlice.reducer;
