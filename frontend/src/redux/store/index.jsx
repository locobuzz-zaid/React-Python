import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk"; // Correct named import
import rootReducer from "../reducers/index";
import { persistStore } from "redux-persist";

// Use thunk (which is the middleware function)
const middleware = [thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

const getStore = () => store;

export { store, getStore };
export const persistor = persistStore(store);
