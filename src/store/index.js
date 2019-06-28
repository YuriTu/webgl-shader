import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {loger} from "./middle/timer";

import * as home from "./home/reducer";


export const store = createStore(
    combineReducers({...home}),
    applyMiddleware(thunk, loger)
)



