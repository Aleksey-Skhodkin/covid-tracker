import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import covidTrackerReducer from "./covid-tracker-reducer";

export const store = createStore(covidTrackerReducer, applyMiddleware(thunk));

window.store = store;