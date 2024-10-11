import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    categories: [],
    loading: false,
    error: ""
}

export const categoriesSlicer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchPending: (state) => {
            state.categories = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess: (state, action) => {
            state.categories = action.payload
            state.loading = false
            state.error = ""
        },
        fetchFailed: (state, action) => {
            state.categories = []
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchPending, fetchSuccess, fetchFailed } = categoriesSlicer.actions

export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const { data } = await axios.get('http://localhost:3000/categories', {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })

        dispatch(fetchSuccess(data))
    } catch (error) {
        dispatch(fetchFailed(error.message))
    }
}

export default categoriesSlicer.reducer