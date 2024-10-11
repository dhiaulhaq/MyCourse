import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    save: [],
    loading: false,
    error: ""
}

export const saveSlicer = createSlice({
    name: 'save',
    initialState,
    reducers: {
        fetchPending: (state) => {
            state.save = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess: (state, action) => {
            state.save = action.payload
            state.loading = false
            state.error = ""
        },
        fetchFailed: (state, action) => {
            state.save = []
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchPending, fetchSuccess, fetchFailed } = saveSlicer.actions

export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const { data } = await axios.get('http://localhost:3000/save', {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })

        dispatch(fetchSuccess(data.data))
    } catch (error) {
        dispatch(fetchFailed(error.message))
    }
}

export default saveSlicer.reducer