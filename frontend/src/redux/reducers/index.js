import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "./Auth";
import NewzVerse from "./NewzVerse/NewzVerse";
import Highchart from "../reducers/HighChart";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "attributes",
    "Tab1",
    "Welcome",
    "Section",
    "ChannelsData",
    "OrmDataPersist",
    "AuthParams",
  ],
};
const rootReducer = combineReducers({
  Authentication: Authentication,
  NewzVerse,
  Highchart,
});

export default persistReducer(persistConfig, rootReducer);
