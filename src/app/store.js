import { configureStore } from '@reduxjs/toolkit'
import videos from '../features/videos-slicer'
import categories from '../features/categories-slicer'
import save from '../features/save-slicer'

export const store = configureStore({
    reducer: {
        videos,
        categories,
        save
    },
})