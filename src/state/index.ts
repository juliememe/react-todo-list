import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import { reducer} from './Reducer';
import {composeWithDevTools} from "redux-devtools-extension";


export const configureStore = () => {
    return createStore(
        combineReducers({todo: reducer}),
        composeWithDevTools(applyMiddleware(thunk)),


    );
}