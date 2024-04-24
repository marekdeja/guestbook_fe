import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { guestBookApi } from '@/api/service'

export type EntryData = {
   userName: string
   userText: string
   entryDate: string
   _id: string
   _v: number
}

export interface GuestBookSlice {
   allEntries: [EntryData] | []
   loading: boolean
   error: unknown
}

const INITIAL_STATE = {
   allEntries: [],
   loading: false,
   error: null,
} as GuestBookSlice

export const fetchAllEntries = createAsyncThunk('guestBook/fetchAllEntries', async () => {
   const response = await guestBookApi.getAllEntries()
   // Only return the data, not the entire response, due to serialization
   return response.data
})

const guestBookSlice = createSlice({
   name: 'guestBookSlice',
   initialState: INITIAL_STATE,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllEntries.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchAllEntries.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.allEntries = action.payload
         })
         .addCase(fetchAllEntries.rejected, (state, action) => {
            state.loading = false
            state.allEntries = []
            state.error = action.error
         })
   },
})

export default guestBookSlice.reducer
