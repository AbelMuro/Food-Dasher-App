import { createAction, createReducer } from '@reduxjs/toolkit'

const updateDeliveryOption = createAction('UPDATE_DELIVERY_OPTION');
const updateSchedule = createAction('UPDATE_SCHEDULE');
const updateDeliveryTime = createAction('UPDATE_DELIVERY_TIME');
const updateTip = createAction('UPDATE_TIP');
const initialState = {
    deliveryOption: {
        option: 'Standard',
        schedule: '',
        deliveryTime: ''
    }, 
    tip: ''};

const locationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateDeliveryOption, (state, action) => {
            state.deliveryOption.option = action.option;
        })   
        .addCase(updateSchedule, (state, action) => {
            state.deliveryOption.schedule = action.schedule;
        })
        .addCase(updateDeliveryTime, (state, action) => {
            state.deliveryOption.deliveryTime = action.deliveryTime
        })  
        .addCase(updateTip, (state, action) => {
            state.tip = action.tip;
        })
})

export default locationReducer;