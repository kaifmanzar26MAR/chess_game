import React from 'react'
import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import TempSidebar from '../components/TempSidebar';




const MainLayout = () => {
  
  return (
      <div>
        {/* <Sidebar /> */}
        {/* <Sidebar /> */}
        <div>
          {/* <Navbar /> */}
          <Outlet />
        </div>
      </div>
    
  )
}

export default MainLayout