"use client"
import { SessionProvider } from 'next-auth/react';


import React from 'react'

const AppProvider = ({children} : any) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AppProvider