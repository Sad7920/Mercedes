import React, { useState, createContext } from 'react';

export const MyContext = createContext(null);

const MyProvider = ({ children }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [totalCount, setTotalCount] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [raceInfo, setRaceInfo] = useState({
        raceName: '',
        raceStartDate: currentDate,
        raceEndDate: currentDate
    });
    const [tyreSets, setTyreSets] = useState([
        {
            setType: "soft",
            count: 8,
            used: 0,
            new: 8,
        },
        {
            setType: "medium",
            count: 3,
            used: 0,
            new: 3,
        },
        {
            setType: "hard",
            count: 2,
            used: 0,
            new: 2,
        }
    ])
    const [saved, setSaved] = useState(false);
    const [sessionsName, setSessionsName] = useState([]);

    const [sessions, setSessions] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));


    const raceWeekendData = {
        user_id: user?._id,
        user_name: user?.name || '',
        race_name: raceInfo?.raceName,
        race_start_date: raceInfo?.raceStartDate,
        race_end_date: raceInfo?.raceEndDate,
        saved: saved,
        sets: tyreSets,
        sessions: sessionsName
    };
    return (
        <div>
            <MyContext.Provider value={{ user, raceInfo, setRaceInfo, raceWeekendData, sessionsName, setSessionsName, setSaved, saved, tyreSets, setTyreSets, sessions, setSessions, totalCount, setTotalCount, showModal, setShowModal, setShowSaveModal, showSaveModal }}>
                {children}
            </MyContext.Provider>
        </div>
    );
};

export default MyProvider;
