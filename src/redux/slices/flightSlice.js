import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";
const initialState={
    flights: [],
    isLoading: true,
    isError: false,
    route: [],
}

const flightSlice= createSlice({
    name: "flight",
    initialState,
    extraReducers: (builder)=>{
        builder
        // cevap beklerken
        .addCase(getFlights.pending, (state)=>{
            state.isLoading = true
        })
        // olumlu cevap geldiğinde
        .addCase(getFlights.fulfilled, (state, action)=>{
            state.flights= action.payload
            state.isLoading= false
            state.isError = false
        })
        .addCase(getFlights.rejected, (state)=>{
            state.isError= true
            state.isLoading= false
            alert("Üzgünüz bir hata ile karşılaştık!")
        });
    },
    reducers:{
        setRoute: (state, action)=>{
            const newRoute=action.payload.map((i)=>[i.lat, i.lng])
            state.route= newRoute
        }
    }
})


export default flightSlice.reducer

export const  {setRoute} = flightSlice.actions;