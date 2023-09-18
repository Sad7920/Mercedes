import React from 'react'


const SessionTyreCard = ({ img, count, alt }) => {
    return (
        <div className='w-full p-4 text-center '>
            <img src={img} alt={alt} className='w-32 h-32 mx-auto' />
            <h1 className='w-32 mx-auto my-2 text-xl font-bold text-[#00f5d0]'>x{count}</h1>
        </div>
    )
}

export default SessionTyreCard