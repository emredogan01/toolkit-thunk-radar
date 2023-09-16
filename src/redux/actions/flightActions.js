import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../../helpers/constants";
import axios from "axios";


export const getFlights = createAsyncThunk("flight/getFlights", async()=>{
    // asenkron
    const res = await axios.request(options)


    // işlenmiş veri
    const newData= res.data.aircraft.map((flight)=>({
        id: flight[0],
        code:flight[1],
        lat: flight[2],
        lng:flight[3],
    }))

    // return
    return newData;
})