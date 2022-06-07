import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "./homeScreen/modalSlice";
import registerReducer from "./homeScreen/registerSlice";
import postJobReducer from "./homeScreen/postJobSlice";
import authReducer from "./auth";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		register: registerReducer,
		postJob: postJobReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
