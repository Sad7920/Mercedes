import React from 'react'
import Navbar from '../../components/Navbar'
import hero from '../../assets/home_car.avif'

const Hero = () => {

    const token = localStorage.getItem('token')
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);
    return (
        <div className='w-full h-screen'>
            <Navbar />
            <div className='relative w-full h-full overflow-hidden'>
                <img className='absolute object-cover -z-10' src={hero} alt='hero' />
                <div className='flex flex-col justify-end w-full h-full max-w-5xl pb-16 mx-auto text-center text-white align-bottom'>
                    <p className='text-3xl font-extrabold text-white '>“ In Formula 1, it's all about the tires. The car is just a platform to make the tires work. ”</p>
                    <p className='text-lg italic font-bold text-gray-300 '>—Michael Schumacher</p>
                </div>
            </div>
        </div>
    )
}

export default Hero