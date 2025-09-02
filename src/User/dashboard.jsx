import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
export const dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
        <div className='relative z-10'>
            <Navbar />
        </div>
        <div>
            <h1>Hao</h1>
        </div>
        <Footer/>
    </div>
    
  )
}

export default dashboard;
