import { useGetNotesQuery } from "../../notesApiSlice";
import Note from "./Projet"; // Check if the filename is exactly 'NoteDB'
import React, { useState } from "react";
import Sidebar from '../../../components/sidebareT';
import DashHeader from '../../../components/DashHeader';
import CreateProject from './creatProjet/CreatProject';
import Modal from 'react-modal'; // Import the Modal component from 'react-modal'

const NotesList = () => {
  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery();

  console.log("isLoading:", isLoading);
  console.log("isError:", isError);
  console.log("isSuccess:", isSuccess);
  console.log("error:", error);
  console.log("project:", project);

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = project;

    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table
        className="w-full table-auto border border-gray-300"
        style={{ borderCollapse: "collapse", direction: 'rtl' }}
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center border bg-white">العنوان</th>
            <th className="px-4 py-2 text-center border bg-white">المقياس</th>
            <th className="px-4 py-2 text-center border bg-white">القسم المكلف</th>
            <th className="px-4 py-2 text-center border bg-white">التعديل</th>
            <th className="px-4 py-2 text-center border bg-white">حذف</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  // Model of adding a new project text:
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
 <div className="flex h-screen">
   <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto"> 
      <DashHeader />
        <div className="flex justify-between items-center px-8 py-4 bg-gray-200">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-DM py-2 px-4 rounded mt-4 ml-3 mb-3"
            >
            اضافة تكليف
          </button>
          <h1 className="text-4xl font-semibold text-gray-800 mb-8 mt-6 text-center">قائمة التكلفات </h1>
        </div>
        {content}
      </main>
      <Sidebar />
       {/* Modal Component */}
       <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        ariaHideApp={false} // Fix for accessibility warnings
      >
        <CreateProject/>
        <button onClick={handleCloseModal}>اغلاق</button>
      </Modal>
    </div>
  );
};

export default NotesList;
