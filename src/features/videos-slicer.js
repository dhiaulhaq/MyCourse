import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    videos: [],
    loading: false,
    error: ""
}

export const videosSlicer = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        fetchPending: (state) => {
            state.videos = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess: (state, action) => {
            state.videos = action.payload
            state.loading = false
            state.error = ""
        },
        fetchFailed: (state, action) => {
            state.videos = []
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchPending, fetchSuccess, fetchFailed } = videosSlicer.actions

export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const { data } = await axios.get('http://localhost:3000/videos', {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })

        dispatch(fetchSuccess(data.data))
    } catch (error) {
        dispatch(fetchFailed(error.message))
    }
}

export default videosSlicer.reducer