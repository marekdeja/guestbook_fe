import { configureStore } from '@reduxjs/toolkit'

import guestBookReducer from './slices/guestBookSlice'

const store = configureStore({
   reducer: {
      guestBook: guestBookReducer,
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {app: AppState}
export type AppDispatch = typeof store.dispatch

export default store
