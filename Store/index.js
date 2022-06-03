import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "./homeScreen/modalSlice";
import registerReducer from "./homeScreen/registerSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		register: registerReducer,
	},
});
