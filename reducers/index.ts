import { combineReducers } from "redux";
import { appReducer, AppStore } from "./appReducer";

export interface StoreState {
    app: AppStore
}

export default combineReducers<StoreState>({
    app: appReducer
});