// SessionsList.js
import React from 'react';
import Session from './Session';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const SessionsList = ({ sessions, onDelete }) => {
    return (
        <Droppable droppableId="sessions">
            {(provided) => (
                <ul className='grid gap-y-5' {...provided.droppableProps} ref={provided.innerRef}>
                    {sessions.map((session, index) => (
                        <Session key={session.id} session={session} index={index} onDelete={onDelete} />
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
};

export default SessionsList;
