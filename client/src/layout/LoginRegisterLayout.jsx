import React from 'react'
import loginCar from '../assets/login_car.webp'
import LoginLogo from '../assets/login_logo.png'

const LoginRegisterLayout = ({ children }) => {
    return (
        <div className='flex w-full h-screen'>
            <div className='relative w-1/2 h-screen bg-black'>
                {/* <div className='absolute w-full top-0 h-[200px] bg-gradient-to-t from-transparent  to-black z-10' /> */}
                <img src={LoginLogo} alt="loginlogo" className='absolute top-5 z-10 left-10 w-[220px]' />
                <img src={loginCar} alt='logincar' className='object-cover object-bottom w-full h-full' />
                <div className='absolute w-full bottom-0 h-[200px] bg-gradient-to-b from-transparent  to-black z-10' />
            </div>
            <div className='w-1/2 h-screen'>
                {children}
            </div>
        </div>
    )
}

export default LoginRegisterLayout