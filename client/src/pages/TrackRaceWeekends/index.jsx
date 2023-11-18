import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import TrackRaceWeekendsCard from '../../components/TrackRaceWeekendsCard'

const TrackRaceWeekends = () => {
    const [raceWeekendsData, setRaceWeekendsData] = useState([])

    useEffect(() => {
        document.body.style.overflow = 'auto';
        const getRaceWeekendsData = async () => {
            try {
                const response = await fetch('https://mercedesamgf1service.onrender.com/weekend/race/fetch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': String(localStorage.getItem('token')).trim().replace(/^['"]|['"]$/g, '')
                    },
                });
                if (response.status == 200) {
                    const data = await response.json();
                    setRaceWeekendsData(data);
                    console.log(data);
                } else {
                    console.log("Something went wrong");
                }
            } catch (err) {
                console.log("Something went wrong", err);
            }
        }
        getRaceWeekendsData();
    }, [])


    return (
        <div className='w-full h-full '>
            <Navbar />
            <div className='pt-[88px]'>
                <h1 className='w-full  py-4 font-bold text-center rounded-br-[4rem] bg-[#00f5d0] text-black italic text-7xl'>Track Race Weekends</h1>
                <div className='flex flex-col w-full h-full p-10 gap-y-6'>
                    {raceWeekendsData.map((raceWeekend, index) => (
                        <TrackRaceWeekendsCard key={index} data={raceWeekend} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrackRaceWeekends