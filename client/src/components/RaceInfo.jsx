import React, { useState, useContext } from 'react';
import { scroller as scroll } from 'react-scroll';
import { MyContext } from '../context/MyProvider';

const RaceInfo = () => {
    // Access context data
    const { raceInfo, setRaceInfo, raceWeekendData } = useContext(MyContext);

    // Function to enable scrolling and disable it after a delay
    function enableScroll() {
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
        }, 1000);
    }

    // State to handle error messages
    const [error, setError] = useState(null);

    // Handle changes to the end date input
    const handleEndDateChange = (e) => {
        if (e.target.value < raceInfo.raceStartDate) {
            setError('End date cannot be before start date');
        } else {
            setError(null);
            setRaceInfo({ ...raceInfo, raceEndDate: e.target.value });
        }
    };

    // Handle click event to validate and proceed
    const handleClick = async (e) => {
        e.preventDefault();
        if (raceInfo.raceName === '') {
            setError('Please fill in all fields');
            return;
        }
        setError(null);
        try {
            const response = await fetch('https://mercedesamgf1service.onrender.com/weekend/race/check-race-dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    raceWeekend: {
                        race_start_date: raceInfo.raceStartDate,
                        race_end_date: raceInfo.raceEndDate,
                    },
                }),
            });

            if (response.status === 201) {
                enableScroll();
                // Scroll to a specific element using react-scroll library
                scroll.scrollTo("tyre-sets", {
                    duration: 1000,
                    smooth: true,
                    offset: -88,
                });
            } else if (response.status === 400) {
                const data = await response.json();
                setError(data.message);
            } else if (response.status === 403) {
                setError(response.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div name="info" className='w-full h-full'>
            <h1 className='w-full py-4 font-bold text-center rounded-br-[4rem] bg-[#00f5d0] text-black italic text-7xl'>Race Info</h1>
            <div className='w-full pt-4'>
                <form className='w-full max-w-lg p-10 mx-auto '>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <h1 className='px-2 pb-2 text-lg font-semibold'>Race Name</h1>
                    <input
                        type="text"
                        required
                        value={raceInfo.raceName}
                        onChange={(e) => setRaceInfo({ ...raceInfo, raceName: e.target.value })}
                        className="relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none appearance-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Race name"
                    />
                    <div className='mt-4'>
                        <h1 className='px-2 py-2 text-lg font-semibold'>Race Start Date</h1>
                        <input
                            type="date"
                            required
                            value={raceInfo.raceStartDate}
                            onChange={(e) => setRaceInfo({ ...raceInfo, raceStartDate: e.target.value })}
                            className="relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className='mt-4'>
                        <h1 className='px-2 py-2 text-lg font-semibold'>Race End Date</h1>
                        <input
                            type="date"
                            required
                            value={raceInfo.raceEndDate}
                            onChange={handleEndDateChange}
                            className="relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className={` ${error ? 'mt-4' : 'mt-8'}`}>
                        <p className='mb-4 text-sm text-red-500'>{error && error}</p>
                        <button onClick={handleClick}
                            className="w-full cursor-pointer px-4 py-2 text-center font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                        >
                            NEXT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RaceInfo;
