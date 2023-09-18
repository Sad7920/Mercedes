import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import RaceInfo from '../../components/RaceInfo'
import TyresSets from '../../components/TyresSets'
import SessionsPage from '../../components/SessionsPage'
import SessionDetails from '../../components/SessionDetails'

const PlanRaceWeekend = () => {
    useEffect(() => {
        function disableScroll() {
            document.body.style.overflow = 'hidden';
        }
        disableScroll()
    }, [])

    return (
        <div className='w-full h-screen  border-b-[5px] bg-black border-b-[#00f5d0]'>
            <Navbar />
            <div className='pt-[88px] w-full h-full text-white'>
                <RaceInfo />
                <TyresSets />
                <SessionsPage />
                <SessionDetails />
            </div>
        </div>

    )
}

export default PlanRaceWeekend