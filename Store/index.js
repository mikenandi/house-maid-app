import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "./homeScreen/modalSlice";
import registerReducer from "./homeScreen/registerSlice";
import postJobReducer from "./homeScreen/postJobSlice";
import authReducer from "./auth";
import agentModalReducer from "./homeScreen/agentModalSlice";
import registerMaidReducer from "./homeScreen/registerMaidSlice";

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		register: registerReducer,
		postJob: postJobReducer,
		auth: authReducer,
		agentModal: agentModalReducer,
		registerMaid: registerMaidReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
