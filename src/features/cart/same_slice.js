import { createSlice } from '@reduxjs/toolkit'


export const same_slice = createSlice({
    name: 'data',
    initialState: {
        data: [],
    },
    reducers: {
        set_data: (state, action) => {
            console.log(action.payload)
            state.data = action.payload
            return 
        }
    },
})

// Action creators are generated for each case reducer function
export const { set_data } = same_slice.actions
export const same_state = (state) => state.data

export default same_slice.reducer
