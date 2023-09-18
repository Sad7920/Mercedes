import React, { useContext } from 'react'
import redTyre from '../assets/red_tyre.png'
import yellowTyre from '../assets/yellow_tyre.png'
import whiteTyre from '../assets/white_tyre.png'
import { MyContext } from '../context/MyProvider'

const SessionDetailsCard = ({ name, totalRed, totalYellow, totalWhite, returnRed, returnYellow, returnWhite, index }) => {
    const { sessions, setSessions, setTotalCount, totalCount } = useContext(MyContext);
    console.log(sessions);

    const incrementCount = (tyreIndex) => {
        if (totalCount[tyreIndex] > 0) {
            const updatedTotalCount = [...totalCount];
            updatedTotalCount[tyreIndex]--;
            setTotalCount(updatedTotalCount);

            const updatedCounts = [...sessions];
            updatedCounts[index].using[tyreIndex].count++;
            updatedCounts[index].using[tyreIndex].new++;
            setSessions(updatedCounts);
        }
    };
    const decrementCount = (tyreIndex) => {
        if (sessions[index].using[tyreIndex].count > 0) {
            const updatedCounts = [...sessions];
            updatedCounts[index].using[tyreIndex].count--;
            updatedCounts[index].using[tyreIndex].new--;
            setSessions(updatedCounts);

            const updatedTotalCount = [...totalCount];
            updatedTotalCount[tyreIndex]++;
            setTotalCount(updatedTotalCount);
        }
    };
    const returnIncrementCount = (tyreIndex) => {
        if (sessions[index].using[tyreIndex].count > sessions[index].returns[tyreIndex].count) {
            const updatedCounts = [...sessions];
            updatedCounts[index].returns[tyreIndex].count++;
            setSessions(updatedCounts);

            const updatedTotalCount = [...totalCount];
            updatedTotalCount[tyreIndex]++;
            setTotalCount(updatedTotalCount);
        }
    }
    const returnDecrementCount = (tyreIndex) => {
        if (sessions[index].returns[tyreIndex].count > 0) {
            const updatedCounts = [...sessions];
            updatedCounts[index].returns[tyreIndex].count--;
            setSessions(updatedCounts);

            const updatedTotalCount = [...totalCount];
            updatedTotalCount[tyreIndex]--;
            setTotalCount(updatedTotalCount);
        }
    }
    return (
        <div className='w-full h-full p-4 border text-center col-span-1 border-neutral-700 border-b-4 border-b-neutral-700 hover:border-b-[#00f5d0]'>
            <h1 className='pb-2 text-lg font-extrabold'>{name}</h1>
            <div className='border border-neutral-800' />
            <div className='pt-2 '>
                <h1 className='italic text-gray-300'>Total Sets</h1>
                <div className='flex items-center pt-4 justify-evenly'>
                    <button onClick={() => decrementCount(0)} className='px-3  font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                    <img src={redTyre} alt="red tyre" className='w-10 h-10' />
                    <h1 className='text-lg font-bold'>x{totalRed}</h1>
                    <button onClick={() => incrementCount(0)} className='px-3 font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                </div>
                <div className='flex items-center pt-4 justify-evenly'>
                    <button onClick={() => decrementCount(1)} className='px-3  font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                    <img src={yellowTyre} alt="red tyre" className='w-10 h-10' />
                    <h1 className='text-lg font-bold'>x{totalYellow}</h1>
                    <button onClick={() => incrementCount(1)} className='px-3 font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                </div>
                <div className='flex items-center pt-4 justify-evenly'>
                    <button onClick={() => decrementCount(2)} className='px-3  font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                    <img src={whiteTyre} alt="red tyre" className='w-10 h-10' />
                    <h1 className='text-lg font-bold'>x{totalWhite}</h1>
                    <button onClick={() => incrementCount(2)} className='px-3 font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                </div>
            </div>
            <div className='mt-2 border border-neutral-800' />
            <div className='pt-2 '>
                <h1 className='italic text-gray-300'>Returns</h1>
                <div className='flex items-center pt-4 justify-evenly'>
                    <button onClick={() => returnDecrementCount(0)} className='px-3  font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                    <img src={redTyre} alt="red tyre" className='w-10 h-10' />
                    <h1 className='text-lg font-bold'>x{returnRed}</h1>
                    <button onClick={() => returnIncrementCount(0)} className='px-3 font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                </div>
                <div className='flex items-center pt-4 justify-evenly'>
                    <button onClick={() => returnDecrementCount(1)} className='px-3  font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                    <img src={yellowTyre} alt="red tyre" className='w-10 h-10' />
                    <h1 className='text-lg font-bold'>x{returnYellow}</h1>
                    <button onClick={() => returnIncrementCount(1)} className='px-3 font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                </div>
                <div className='flex items-center pt-4 justify-evenly'>
                    <button onClick={() => returnDecrementCount(2)} className='px-3  font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>-</button>
                    <img src={whiteTyre} alt="red tyre" className='w-10 h-10' />
                    <h1 className='text-lg font-bold'>x{returnWhite}</h1>
                    <button onClick={() => returnIncrementCount(2)} className='px-3 font-thin text-white bg-black border border-neutral-600 rounded-sm text-xl focus:outline-none hover:border-b-4 border-b-4  hover:border-b-[#00f5d0] hover:bg-neutral-800'>+</button>
                </div>
            </div>
        </div>
    )
}

export default SessionDetailsCard