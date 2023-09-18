import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import logo from '../assets/logo.avif'
import { BiSolidChevronRight } from 'react-icons/bi'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        navigate('/')
    }
    return (
        <>
            <div className='bg-black border-b-[5px] z-20 fixed w-full  border-b-[#00f5d0] px-20 py-4 flex items-center '>
                <div onClick={() => navigate('/hero')} className='cursor-pointer '>
                    <img src={logo} alt="logo" className='w-[200px] ' />
                </div>
                <div className='items-center w-full'>
                    <ul className='flex justify-end space-x-10 text-md'>
                        <Link to="/planrace" className='text-gray-100 items-center cursor-pointer decoration-[#00f5d0] hover:underline flex'>Plan race weekend <BiSolidChevronRight className='w-6 h-6 text-gray-100' /></Link>
                        <Link to="/trackrace" className='text-gray-100 items-center cursor-pointer decoration-[#00f5d0] hover:underline flex'>Track race weekends </Link>
                        <li onClick={handleLogout} className='text-gray-100 cursor-pointer decoration-[#00f5d0] hover:underline'>Logout</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar