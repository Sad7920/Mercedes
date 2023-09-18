import React from 'react'

const TyreCard = ({ img, alt, name, value, handleEvent, addButton, subButton }) => {
    return (
        <div className='w-full p-2 text-center'>
            <img src={img} alt={alt} className='p-2 mx-auto rounded-full border  border-[#00f5d0]' />
            <h1 className='mt-4 text-3xl font-extrabold text-gray-100 uppercase'>{name}</h1>
            <div className='flex justify-around mt-6 mb-2'>
                <div className='items-center gap-x-4'>
                    <input
                        type="number"
                        required
                        value={value}
                        onChange={handleEvent}
                        className="relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none appearance-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Total Tyre Sets"
                    />
                    <div className='flex flex-row w-full mt-3 gap-x-2'>
                        <button onClick={subButton} className='px-6 w-full font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                        <button onClick={addButton} className='px-6 w-full font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TyreCard