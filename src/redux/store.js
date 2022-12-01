import { configureStore } from "@reduxjs/toolkit";
import evSlice, { fileReducer } from './reducer'

//multiple reducers
const reducers = {
    fileReducer,
    evSlice
};

const store = configureStore({
    reducer: reducers
});

export default store;