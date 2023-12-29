"use client"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CategoryState {
    products: any
}



const initialState: CategoryState = {
  products: []
}

export const categorySlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    initialProduct: (state,action: PayloadAction<[]>) => {
      state.products = action.payload
      console.log(state.products);
      console.log(action);
    },
    createProduct: (state,action: PayloadAction<[]>) => {
      state.products = action.payload
      console.log(state.products);
      console.log(action);
    },
    updateProduct: (state,action: PayloadAction<[]>) => {
      state.products = action.payload
      console.log(state.products);
      console.log(action);
    },
  },
})

// Action creators are generated for each case reducer function
export const {initialProduct, createProduct, updateProduct } = categorySlice.actions

export default categorySlice.reducer