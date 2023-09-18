import React, { useContext } from 'react'
import redTyre from '../assets/red_tyre.png'
import yellowTyre from '../assets/yellow_tyre.png'
import whiteTyre from '../assets/white_tyre.png'
import { MyContext } from '../context/MyProvider'
import UseSaveFormatModal from './UseSaveFormatModal'


const SaveRaceWeekendsModal = ({ savedRaceWeekends }) => {
    const { setShowSaveModal } = useContext(MyContext)
    return (
        <div>
            {
                savedRaceWeekends.map((raceWeekend, index) => (
                    <div className='w-full p-4 border border-neutral-700' key={index}>
                        <UseSaveFormatModal raceWeekend={raceWeekend} />
                        <h1 className='pb-2 text-xl italic font-bold text-center text-white border-b border-b-neutral-700'>{raceWeekend.raceWeekend.race_name}</h1>
                        <div className='flex flex-col mt-2 '>
                            {raceWeekend.raceWeekend.sets.map((set, index) => (
                                <div key={index} className='flex items-center px-4 py-2 mx-auto gap-x-3'>
                                    <img className='w-10 h-10' src={set.setType == 'soft' && redTyre || set.setType == 'medium' && yellowTyre || set.setType == 'hard' && whiteTyre} alt="" />
                                    <p className='text-xl italic font-extrabold'>x{set.count}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowSaveModal(true)}
                            className="w-full cursor-pointer mt-2 px-4 py-2 text-center font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                        >
                            USE
                        </button>
                    </div>
                ))
            }
        </div>

    )
}

export default SaveRaceWeekendsModal