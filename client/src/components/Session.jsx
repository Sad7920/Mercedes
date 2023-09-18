import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillDelete } from 'react-icons/ai';

const Session = ({ session, index, onDelete }) => {
    const handleDelete = () => {
        onDelete(session.id);
    };
    return (
        <Draggable draggableId={session.id} index={index}>
            {(provided) => (
                <li className='flex items-center justify-between text-4xl w-full px-4 py-3 bg-neutral-900 border-[0.2px] rounded-none appearance-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {session.session}
                    {session.session === 'Race session' ? <button><AiFillDelete className='p-2 w-9 h-9 text-neutral-900' /></button> : <button onClick={handleDelete}><AiFillDelete className='p-2 w-9 h-9 hover:text-red-500' /></button>}
                </li>
            )}
        </Draggable>
    );
};

export default Session;
