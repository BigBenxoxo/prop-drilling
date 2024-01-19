import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDataRedux = createAsyncThunk(
    "data/getDataRedux", async (url) => {
try { const response = await axios.get(`${url}/data`); 
return response.data;
} catch (error) {
    console.error(error); 
}
});


export const reduxHandleUpdate = createAsyncThunk(
    "data/reduxHandleUpdate", 
    async ({ data, orders }, thunkApi) => {
        try {
            const response = await axios.put(`http://localhost:3001/data`, { ...data, orders, 
        })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
    }
)

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: undefined,
        isLoading: false,
    },
    reducers: {
       // Internal application logic goes here
    },
    extraReducers: (builder) => {
        builder
.addCase(
    getDataRedux.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
    }
);
    },
    })
    .addCase(reduxHandleUpdate.fulfilled, (state, action) => {
        state.data = action.payload;
    });

export default dataSlice.reducer;
    