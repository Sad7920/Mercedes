import React, { useState } from 'react';

const AddSession = ({ addSession }) => {
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAddSession = () => {
        if (newTask.trim() === '') return;

        addSession(newTask);
        setNewTask('');
    };

    return (
        <div className='grid grid-cols-5 mb-5 gap-x-2'>
            <input
                type="text"
                placeholder="Add a new session"
                value={newTask}
                onChange={handleInputChange}
                className='relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none appearance-none placeholder-neutral-500 text-neutral-300 col-span-4 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm'
            />
            <button className='col-span-1 w-full px-4 py-2 font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-3 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200' onClick={handleAddSession}>Add</button>
        </div>
    );
};

export default AddSession;
