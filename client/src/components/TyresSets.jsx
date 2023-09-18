import React, { useContext, useEffect, useState } from 'react'
import redTyre from '../assets/red_tyre.png'
import yellowTyre from '../assets/yellow_tyre.png'
import whiteTyre from '../assets/white_tyre.png'
import TyreCard from './TyreCard'
import { Link } from 'react-scroll'
import { MyContext } from '../context/MyProvider'
import { scroller as scroll } from 'react-scroll'
import SaveRaceWeekendsModal from './SaveRaceWeekendsModal'


const TyresSets = () => {

    const { tyreSets, setTyreSets } = useContext(MyContext)
    const [error, setError] = useState(null)
    const [savedRaceWeekends, setSavedRaceWeekends] = useState([])

    const handleTyreCountChange = (e, i) => {
        setTyreSets({ ...tyreSets, [i]: { ...tyreSets[i], count: parseInt(e.target.value), new: parseInt(e.target.value) } })
    }
    const handleAddTyreSet = (e, i) => {
        setTyreSets({ ...tyreSets, [i]: { ...tyreSets[i], new: tyreSets[i].new + 1, count: tyreSets[i].count + 1 } })
    }
    const handleRemoveTyreSet = (e, i) => {
        if (tyreSets[i].new === 0) return
        setTyreSets({ ...tyreSets, [i]: { ...tyreSets[i], new: tyreSets[i].new - 1, count: tyreSets[i].count - 1 } })
    }

    function enableScroll() {
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
        }, 1000)
    }

    useEffect(() => {
        const getSavedRaceWeekendsData = async () => {
            try {
                const response = await fetch('http://localhost:3000/weekend/race/fetch-saved', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': String(localStorage.getItem('token')).trim().replace(/^['"]|['"]$/g, '')
                    },
                });
                if (response.status == 200) {
                    const data = await response.json();
                    setSavedRaceWeekends(data);
                    console.log("savedData", data);
                } else {
                    console.log("Something went wrong");
                }
            } catch (err) {
                console.log("Something went wrong", err);
            }
        }
        getSavedRaceWeekendsData();
    }, [])

    function handleClick(e) {
        e.preventDefault()
        setError(null)
        if (tyreSets[0].new < 1 && tyreSets[1].new < 1 && tyreSets[2].new < 1) {
            setError('Please select at least one tyre set')
            return
        } else {
            enableScroll()
            scroll.scrollTo("race-session", {
                duration: 1000,
                smooth: true,
                offset: - 88
            });
        }
    }

    return (
        <div id="tyre-sets" className='w-full h-full'>
            <div className='flex w-full h-full'>
                <div className='h-full bg-neutral-900 border-r border-t-8 px-4 py-6 border-[#00f5d0] w-72'>
                    <h1 className='text-2xl italic font-bold text-center'>Saved Formats</h1>
                    {savedRaceWeekends ? <div className='flex flex-col w-full mt-4 gap-y-4'><SaveRaceWeekendsModal savedRaceWeekends={savedRaceWeekends} /></div> : <p className='py-6 text-center text-white'>No saved formats</p>}
                </div>
                <div className='w-full '>
                    <h1 className='w-full py-4 font-bold text-center rounded-br-[4rem] bg-[#00f5d0] text-black italic text-7xl'>Total Tyre Sets</h1>
                    <div className='grid justify-around w-full max-w-5xl grid-cols-3 px-4 mx-auto pt-14 gap-x-4'>
                        <TyreCard img={redTyre} alt="red tyre" name="Soft" value={tyreSets[0].count} handleEvent={e => handleTyreCountChange(e, 0)} addButton={e => handleAddTyreSet(e, 0)} subButton={e => handleRemoveTyreSet(e, 0)} />

                        <TyreCard img={yellowTyre} alt="yellow tyre" name="Medium" value={tyreSets[1].count} handleEvent={e => handleTyreCountChange(e, 1)} addButton={e => handleAddTyreSet(e, 1)} subButton={e => handleRemoveTyreSet(e, 1)} />

                        <TyreCard img={whiteTyre} alt="white tyre" name="Hard" value={tyreSets[2].count} handleEvent={e => handleTyreCountChange(e, 2)} addButton={e => handleAddTyreSet(e, 2)} subButton={e => handleRemoveTyreSet(e, 2)} />
                        <div className='col-span-1' />
                        <div className='w-full'>
                            {error && <p className='w-full text-center text-red-500'>{error}</p>}
                            <div className='flex w-full mx-auto mt-2 gap-x-4'>
                                <Link onClick={enableScroll} to="info" smooth={true} offset={-88} duration={1000}
                                    type="submit"
                                    className="w-full px-4 cursor-pointer py-2 text-center font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                                >
                                    BACK
                                </Link>
                                <button onClick={handleClick}
                                    className="w-full cursor-pointer px-4 py-2 text-center font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                                >
                                    NEXT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TyresSets