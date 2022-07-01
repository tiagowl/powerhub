import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: "user",
    initialState:{
        name: "",
        gym: 0
    },
    reducers:{
        setUser(state, {payload}){
            state.name = payload.name;
            state.gym = payload.gym;
        }
    }
});

export const {setUser} = slice.actions;