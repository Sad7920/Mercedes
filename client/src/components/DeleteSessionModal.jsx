import React, { useState, useContext } from 'react';
import { MyContext } from '../context/MyProvider';

const DeleteSessionModal = ({ raceWeekendId }) => {
    const [loading, setLoading] = useState(false);
    const { showModal, setShowModal } = useContext(MyContext);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://mercedesamgf1service.onrender.com/weekend/race/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': String(localStorage.getItem('token')).trim().replace(/^['"]|['"]$/g, '')
                },
                body: JSON.stringify({ id: raceWeekendId })
            });
            if (response.status == 200) {
                window.location.reload();
            } else if (response.status == 400) {
                alert(response.message);
            } else if (response.status == 500) {
                alert(response.message);
            } else {
                console.log("Something went wrong");
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("Something went wrong", err);
        }
    }

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className={`fixed inset-0 z-50 flex bg-black bg-opacity-50   items-center justify-center ${showModal ? '' : 'hidden'}`}>
            <div className="w-64 p-4 bg-black rounded shadow border text-center border-[#00f5d0]">
                <h3 className="mb-2 text-lg font-extrabold">Delete race plan</h3>
                <p className="mb-4">Are you sure you want to delete this race plan?</p>
                <div className="flex justify-around">
                    <button className="px-4 py-2 mr-2 text-sm font-medium text-white border border-gray-300 rounded hover:text-black hover:bg-gray-100" onClick={handleClose}>Cancel</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-black border border-red-500 rounded hover:bg-red-600" onClick={handleDelete}>{loading ? 'Deleting...' : 'Delete'}</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSessionModal;
