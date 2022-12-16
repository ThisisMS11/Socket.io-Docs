import React, { Component } from 'react'
import loading from '../assets/loading.gif'
const Spinner = () => {

    return (
        <div className='bg-white h-[100vh] opacity-60 w-full fixed z-10 bg-no-repeat bg-center flex justify-center items-center'>
            {/* loading is the name of gif */}
            <img src={loading} alt="loading..." className='w-14 h-14 opacity-120 absolute z-20'/>
        </div>
    )
}
export default Spinner