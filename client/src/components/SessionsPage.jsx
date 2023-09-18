// SessionsPage.js
import React, { useState, useContext } from 'react';
import SessionsList from './SessionsList';
import AddSession from './AddSession';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-scroll';
import { MyContext } from '../context/MyProvider';
import { scroller as scroll } from 'react-scroll';

const SessionsPage = () => {
    const [sesh, setSesh] = useState([{ id: '0', session: 'Race session' }]);
    const { setSessionsName, setSessions } = useContext(MyContext)

    function handleClick(e) {
        e.preventDefault()
        const temp = []
        sesh.forEach(session => {
            temp.push(session.session)
        })
        setSessionsName(temp)
        const updatedSessions = temp.map((session) => ({
            session_name: session,
            race_weekend_id: '',
            returns: [
                { tyreType: "Soft", count: 0 },
                { tyreType: "Medium", count: 0 },
                { tyreType: "Hard", count: 0 }
            ],
            using: [
                { tyreType: "Soft", count: 0, used: 0, new: 0 },
                { tyreType: "Medium", count: 0, used: 0, new: 0 },
                { tyreType: "Hard", count: 0, used: 0, new: 0 }
            ],
        }));

        setSessions(updatedSessions);
        enableScroll()
        scroll.scrollTo("session-details", {
            duration: 1000,
            smooth: true,
            offset: - 88
        });
    }

    function enableScroll() {
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
        }, 1000)
    }

    const addSession = (newTask) => {
        const updatedSessions = [
            { id: `${sesh.length + 1}`, session: newTask },
            ...sesh,
        ];
        setSesh(updatedSessions);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedSessions = [...sesh];
        const [reorderedSession] = updatedSessions.splice(result.source.index, 1);
        updatedSessions.splice(result.destination.index, 0, reorderedSession);

        setSesh(updatedSessions);
    };

    const handleDeleteSession = (sessionId) => {
        const updatedSessions = sesh.filter((session) => session.id !== sessionId);
        setSesh(updatedSessions);
    };

    return (
        <div name="race-session" className='w-full h-full min-h-full overflow-hidden max-h-max'>
            <h1 className='w-full py-4 font-bold text-center rounded-br-[4rem] bg-[#00f5d0] text-black italic text-7xl'>Race Sessions</h1>
            <div className='w-full max-w-md mx-auto mt-6 text-white'>
                <AddSession addSession={addSession} />
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sessions">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                <SessionsList sessions={sesh} onDelete={handleDeleteSession} />
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className='flex w-full mx-auto my-8 gap-x-4'>
                    <Link onClick={enableScroll} to="tyre-sets" smooth={true} offset={-88} duration={1000}
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
    );
};

export default SessionsPage;
