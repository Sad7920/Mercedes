import React, { useState, useContext } from 'react'
import singaporeGp from '../assets/singaporeGP.png'
import { AiFillDelete } from 'react-icons/ai'
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi'
import redTyre from '../assets/red_tyre.png'
import yellowTyre from '../assets/yellow_tyre.png'
import whiteTyre from '../assets/white_tyre.png'
import DeleteSessionModal from './DeleteSessionModal'
import { MyContext } from '../context/MyProvider'

const TrackRaceWeekendsCard = ({ data }) => {
    const { raceWeekend, sessions } = data
    const [open, setOpen] = useState(false)
    const { setShowModal } = useContext(MyContext);
    console.log(sessions);


    const expandedRaceWeekendStyle = {
        maxHeight: open ? '2000px' : '0',
        transition: 'max-height 0.7s ease-in-out',
        overflow: 'hidden'
    };
    return (
        <div className='w-full max-w-2xl p-4 mx-auto text-white border border-neutral-700'>
            <DeleteSessionModal raceWeekendId={raceWeekend._id} />
            <div className='flex items-center h-full'>
                <div className='pr-4 border-r-2 border-r-neutral-700'>
                    <img src={singaporeGp} alt="logo" className='w-32 filter-invert ' />
                </div>
                <div className='flex items-center justify-between w-full h-full px-4 text-neutral-200'>
                    <div className='flex flex-col justify-between w-full h-full'>
                        <p className='text-3xl font-extrabold text-[#00f5d0] italic'>{raceWeekend.race_name}</p>
                        <p className='text-lg italic font-extrabold text-neutral-400'>{raceWeekend.race_start_date}</p>
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <div onClick={() => { setShowModal(true); }} className='p-1 border border-red-500 rounded-full cursor-pointer hover:text-red-500 hover:bg-black bg-neutral-800'><AiFillDelete className='w-6 h-6 ' /></div>
                        <div onClick={() => setOpen(!open)} className='p-1 border border-[#00f5d0] cursor-pointer rounded-full hover:text-[#00f5d0] hover:bg-black bg-neutral-800'>{open ? <FiChevronsUp className='w-6 h-6 ' /> : <FiChevronsDown className='w-6 h-6 ' />}</div>
                    </div>
                </div>
            </div>
            <div style={expandedRaceWeekendStyle} className=''>
                <div className='pt-4 '>
                    <div className='border-t-2 border-neutral-700' />
                    <div className='flex items-center justify-around w-full h-full p-4 text-neutral-200'>
                        <div className='flex items-center '>
                            <h1 className='items-end h-full px-4 py-[14px] border-y border-l border-neutral-700 bg-neutral-800 text-white text-xl italic font-extrabold'>Total Tyre sets</h1>
                            {raceWeekend.sets.map((set, index) => (
                                <div key={index} className='flex items-center px-4 py-2 border-r border-neutral-700 border-y gap-x-1'>
                                    <img className='w-10 h-10' src={set.setType == 'soft' && redTyre || set.setType == 'medium' && yellowTyre || set.setType == 'hard' && whiteTyre} alt="" />
                                    <p className='text-xl italic font-extrabold'>x{set.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='border-t-2 border-neutral-700' />
                    <div className='flex flex-col p-4 gap-y-4'>
                        {sessions.map((session, index) => (
                            <div key={index} className='flex w-full border rounded-md border-neutral-700'>
                                <div className='bg-[#00f5d0] w-1/4 rounded-l-md text-center justify-center flex items-center'>
                                    <p className='text-xl italic font-extrabold text-black'>
                                        {session.session_name}
                                    </p>
                                </div>
                                <div className='flex flex-col items-center justify-around w-full p-4 gap-y-4'>
                                    <div className='w-full'>
                                        <div className='flex items-center '>
                                            <h1 className='items-end h-full px-2 py-[14px] border-y border-l border-neutral-700 bg-neutral-800 text-white text-md italic font-extrabold'>Tyre sets</h1>
                                            {session.using.map((set, index) => (
                                                <div key={index} className='flex items-center px-2 py-2 border-r border-neutral-700 border-y gap-x-1'>
                                                    <img className='w-9 h-9' src={set.tyreType == 'Soft' && redTyre || set.tyreType == 'Medium' && yellowTyre || set.tyreType == 'Hard' && whiteTyre} alt="" />
                                                    <p className='text-xl italic font-extrabold'>x{set.count}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex items-center '>
                                            <h1 className='items-end h-full px-2 py-[14px] border-y border-l border-neutral-700 bg-neutral-800 text-white text-md italic font-extrabold'>Returns</h1>
                                            {session.returns.map((set, index) => (
                                                <div key={index} className='flex items-center px-2 py-2 border-r border-neutral-700 border-y gap-x-1'>
                                                    <img className='w-9 h-9' src={set.tyreType == 'Soft' && redTyre || set.tyreType == 'Medium' && yellowTyre || set.tyreType == 'Hard' && whiteTyre} alt="" />
                                                    <p className='text-xl italic font-extrabold'>x{set.count}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex items-center '>
                                            <h1 className='items-end h-full px-2 py-[14px] border-y border-l border-neutral-700 bg-neutral-800 text-white text-md italic font-extrabold'>New</h1>
                                            {session.using.map((set, index) => (
                                                <div key={index} className='flex items-center px-2 py-2 border-r border-neutral-700 border-y gap-x-1'>
                                                    <img className='w-9 h-9' src={set.tyreType == 'Soft' && redTyre || set.tyreType == 'Medium' && yellowTyre || set.tyreType == 'Hard' && whiteTyre} alt="" />
                                                    <p className='text-xl italic font-extrabold'>x{set.new}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex items-center '>
                                            <h1 className='items-end h-full px-2 py-[14px] border-y border-l border-neutral-700 bg-neutral-800 text-white text-md italic font-extrabold'>Used</h1>
                                            {session.using.map((set, index) => (
                                                <div key={index} className='flex items-center px-2 py-2 border-r border-neutral-700 border-y gap-x-1'>
                                                    <img className='w-9 h-9' src={set.tyreType == 'Soft' && redTyre || set.tyreType == 'Medium' && yellowTyre || set.tyreType == 'Hard' && whiteTyre} alt="" />
                                                    <p className='text-xl italic font-extrabold'>x{set.used}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackRaceWeekendsCard