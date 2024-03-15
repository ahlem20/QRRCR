import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectUserById } from '../../usersApiSlice'; // Assuming selectAllNotes is available
import Modal from 'react-modal';
import useAuth from "../../../hooks/useAuth";
import W from '../../../components/student';

const Note = ({ userId }) => {
    const allUsers = useSelector(selectAllUsers); // Fetching all users
    const user = useSelector((state) => selectUserById(state, userId));
    const [expanded, setExpanded] = useState(false);
    const [matchingUsers, setMatchingUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID
    const { username } = useAuth();

    const handleRowClick = () => {
        if (!expanded) {
            // Filter users with the same class properties
            const filteredUsers = allUsers.filter(u => 
                u.university === user.university &&
                u.faculty === user.faculty &&
                u.departement === user.departement &&
                u.spicaility === user.spicaility &&
                u.groop === user.groop &&
                u.module === user.module

            );
            setMatchingUsers(filteredUsers);
        }
        setExpanded(!expanded);
    };
    

    // Function to handle opening modal with user ID
    const openModal = (userId) => {
        setSelectedUserId(userId); // Store the selected user ID in state
        setShowModal(true); // Open the modal
    };

    // Function to handle closing modal
    const closeModal = () => {
        setShowModal(false);
    };

    if (user && user.teacherName === username) {
        return (
            <>
                <tr className="table__row" onClick={handleRowClick}>
                    <td className="py-3 px-4 text-center border">{user.university}</td>
                    <td className="py-3 px-4 text-center border">{user.faculty}</td> 
                    <td className="py-3 px-4 text-center border">{user.departement}</td> 
                    <td className="py-3 px-4 text-center border">{user.spicaility}</td> 
                    <td className="py-3 px-4 text-center border">{user.groop}</td> 
                    <td className="py-3 px-4 text-center border">{user.module}</td> 
                </tr>
                {expanded && matchingUsers.length > 0 && (
                    <>
                        <tr className="table__row-expanded">
                            <td colSpan="5" className="py-3 px-4 text-center border text-xl font-bold bg-gray-200" dir="rtl">طلبة الفوج: </td>
                        </tr>
                        {matchingUsers.map(matchingUser => (
                            <tr key={matchingUser.id} className="table__row-expanded" dir='rtl'>
                                <td className="py-3 px-20 text-center border text-blue-500">{matchingUser.username}</td>
                                <td className="py-3 px-20 text-center border text-blue-500">{matchingUser.matricule}</td> 
                                <td className="py-3 px-20 text-center border text-blue-500">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-DM py-2 px-4 rounded whitespace-nowrap" onClick={() => openModal(matchingUser.username)}>انجازت الطالب</button>
                                </td>      
                                <td className="py-3 text-center border px-20 text-blue-500">
                                    <button className="bg-green-500 hover:bg-green-700 text-white text-xl font-DM py-2 px-4 rounded whitespace-nowrap" onClick={openModal}>تعديل </button>
                                </td>   
                                <td className="py-3 text-center border px-20 text-blue-500">
                                    <button className="bg-red-500 hover:bg-red-700 text-white text-xl font-DM py-2 px-4 rounded whitespace-nowrap" onClick={openModal}>حذف </button>
                                </td> 
                            </tr>
                        ))}
                    </>
                )}
                <>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                    >
                        <div>الطالب(ة): {selectedUserId}</div>
                        <W/>
                        <button onClick={closeModal}>اغلاق </button>
                    </Modal>
                </>
            </>
        );
    } else {
        return null;
    }
};

export default Note;
