import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context/MyProvider';

const UseSaveFormatModal = ({ raceWeekend }) => {
    const [loading, setLoading] = useState(false);
    console.log("raceWeekend", raceWeekend);
    const { showSaveModal, setShowSaveModal, raceWeekendData } = useContext(MyContext);


    const handleDelete = async () => {
        try {
            setLoading(true);
            const updatedRaceWeekend = { ...raceWeekend.raceWeekend };

            // Update the properties
            updatedRaceWeekend.user_name = raceWeekendData.user_name;
            updatedRaceWeekend.user_id = raceWeekendData.user_id;
            updatedRaceWeekend.race_start_date = raceWeekendData.race_start_date;
            updatedRaceWeekend.race_end_date = raceWeekendData.race_end_date;

            console.log("updatedRaceWeekend", updatedRaceWeekend);


            setLoading(false);
            setShowSaveModal(false);
        } catch (err) {
            setLoading(false);
            console.log("Something went wrong", err);
        }
    }

    const handleClose = () => {
        setShowSaveModal(false);
    };

    return (
        <div className={`fixed inset-0 z-50 flex bg-black bg-opacity-50   items-center justify-center ${showSaveModal ? '' : 'hidden'}`}>
            <div className="w-64 p-4 bg-black rounded shadow border text-center border-[#00f5d0]">
                <h3 className="mb-2 text-lg font-extrabold">Use race plan</h3>
                <p className="mb-4">Are you sure you want to use this race plan?</p>
                <div className="flex justify-around">
                    <button className="px-4 py-2 mr-2 text-sm font-medium text-white border border-gray-300 rounded hover:text-black hover:bg-gray-100" onClick={handleClose}>Cancel</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-black border border-red-500 rounded hover:bg-red-600" onClick={handleDelete}>{loading ? 'Saving...' : 'Yes'}</button>
                </div>
            </div>
        </div>
    );
};

export default UseSaveFormatModal;
