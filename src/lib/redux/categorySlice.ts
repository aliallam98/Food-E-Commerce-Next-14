"use client"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CategoryState {
  categories: any
}



const initialState: CategoryState = {
  categories: []
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initialCategory: (state,action: PayloadAction<[]>) => {
      state.categories = action.payload
      console.log(state.categories);
      console.log(action);
    },
    createCategory: (state,action: PayloadAction<[]>) => {
      state.categories = action.payload
      console.log(state.categories);
      console.log(action);
    },
    updateCategory: (state,action: PayloadAction<[]>) => {
      state.categories = action.payload
      console.log(state.categories);
      console.log(action);
    },
  },
})

// Action creators are generated for each case reducer function
export const {initialCategory, createCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer