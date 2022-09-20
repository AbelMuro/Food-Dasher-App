import {configureStore} from '@reduxjs/toolkit';
import OrderReducer from './reducers/OrderReducer.js';

//creating the store
const store = configureStore({
    reducer: OrderReducer
});  

export default store;