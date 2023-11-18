import React, { useContext, useEffect } from 'react'
import SessionTyreCard from './SessionTyreCard'
import redTyre from '../assets/red_tyre.png'
import yellowTyre from '../assets/yellow_tyre.png'
import whiteTyre from '../assets/white_tyre.png'
import SessionDetailsCard from './SessionDetailsCard'
import { Link } from 'react-scroll'
import { MyContext } from '../context/MyProvider'
import { useNavigate } from 'react-router-dom'


const SessionDetails = () => {
    const { tyreSets, totalCount, setTotalCount, sessions, sessionsName, saved, setSaved, raceWeekendData } = useContext(MyContext);

    console.log(JSON.stringify({ raceWeekend: raceWeekendData, sessions: sessions }));
    const navigate = useNavigate();
    console.log(sessions);

    useEffect(() => {
        setTotalCount([tyreSets[0].count, tyreSets[1].count, tyreSets[2].count]);
    }, [tyreSets, sessionsName]);

    const handleSaveRaceWeekend = async (e) => {
        e.preventDefault();
        if (totalCount[0] != 0 || totalCount[1] != 0 || totalCount[2] != 0) {
            alert("Please use all available sets to proceed!")
            return;
        }
        try {
            const response = await fetch('https://mercedesamgf1service.onrender.com/weekend/race/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': String(localStorage.getItem('token')).trim().replace(/^['"]|['"]$/g, '')
                },
                body: JSON.stringify({ "raceWeekend": raceWeekendData, "sessions": sessions }),
            });
            if (response.status == 400) {
                console.log(response.message);
            } else if (response.status == 201) {
                navigate('/trackrace')
            }
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }
    function enableScroll() {
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
        }, 1000)
    }
    return (
        <div name="session-details" className='flex w-full h-full'>
            <div className='h-full bg-neutral-900 border-r border-t-8 py-6 border-[#00f5d0] w-72'>
                <h1 className='text-2xl italic font-bold text-center'>Available Sets</h1>
                <SessionTyreCard img={redTyre} alt="red tyre" count={totalCount[0]} />
                <SessionTyreCard img={yellowTyre} alt="yellow tyre" count={totalCount[1]} />
                <SessionTyreCard img={whiteTyre} alt="white tyre" count={totalCount[2]} />
            </div>
            <div className='w-full h-full'>
                <h1 className='w-full py-4 font-bold text-center rounded-br-[4rem] bg-[#00f5d0] text-black italic text-7xl'>Session details</h1>
                <div className='grid w-full grid-cols-5 p-4 gap-x-4'>
                    {sessions.map((session, index) => {
                        return (
                            <SessionDetailsCard
                                key={index}
                                index={index}
                                name={session.session_name}
                                returnRed={session.returns[0].count}
                                returnYellow={session.returns[1].count}
                                returnWhite={session.returns[2].count}
                                totalRed={session.using[0].count}
                                totalYellow={session.using[1].count}
                                totalWhite={session.using[2].count}
                            />
                        )
                    })}
                </div>
                <div className='flex w-2/3 mx-auto gap-x-4'>
                    <Link onClick={enableScroll} to="race-session" smooth={true} offset={-88} duration={1000}
                        type="submit"
                        className="w-full px-4 cursor-pointer py-2 text-center font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                    >
                        BACK
                    </Link>
                    <button onClick={() => { setSaved(!saved); if (saved == false) { alert("Format saved succesfully!") } }} className={`w-full border border-neutral-600 ${saved ? 'bg-[#00f5d0] text-black hover:bg-[#6cd1c2]' : 'hover:bg-neutral-700 hover:border-white'}`}>Save Format</button>
                    <button onClick={handleSaveRaceWeekend}
                        className="w-full cursor-pointer px-4 py-2 text-center font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SessionDetails