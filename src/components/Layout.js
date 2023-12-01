import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'



function Layout() {
  return (
    <div class="bg-white rounded-lg  dark:bg-gray-900 m-4">
      <div>
        <Header />
        <Outlet />  
        <Footer />
      </div>
    </div>
  )
}

export default Layout