import { useGetUsersQuery } from "../../usersApiSlice";
import Note from "./StudentDB";
import React ,{useState} from "react";
import Sidebar from '../../../components/sidebareT';
import DashHeader from '../../../components/DashHeader';
import Modal from 'react-modal';
import StudentForm from './creatClass/CreatClass';
import Plagia from '../plagia';
const NotesList = () => {
  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = project;

    const tableContent = ids?.length
      ? ids.map((userId) => <Note key={userId} userId={userId} />)
      : null;

    content = (
      
      <table
          className="w-full table-auto border border-gray-300"
          style={{ borderCollapse: "collapse", direction: 'rtl' }}
        >
          <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-l font-medium text-black bg-white uppercase tracking-wider">
              الجامعة
            </th>
            <th scope="col" className="px-6 py-3 text-center text-l font-medium text-black bg-white uppercase tracking-wider">
              القسم
            </th>
            <th scope="col" className="px-6 py-3 text-center text-l font-medium text-black bg-white uppercase tracking-wider">
              التخصص 
            </th>
            <th scope="col" className="px-6 py-3 text-center text-l font-medium text-black bg-white uppercase tracking-wider">
              السنة
            </th>
            <th scope="col" className="px-6 py-3 text-center text-l font-medium text-black bg-white uppercase tracking-wider">
              الفوج
            </th><th scope="col" className="px-6 py-3 text-center text-l font-medium text-black bg-white uppercase tracking-wider">
              المقياس
            </th>
          </tr>
        </thead>
        <tbody dir="rtl" className="bg-white  divide-y divide-gray-200">
          {tableContent}
        </tbody>
      </table>
    );
  }

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isPlagiaModalOpen, setIsPlagiaModalOpen] = useState(false);

  const openStudentModal = () => {
    setIsStudentModalOpen(true);
  };

  const closeStudentModal = () => {
    setIsStudentModalOpen(false);
  };

  const openPlagiaModal = () => {
    setIsPlagiaModalOpen(true);
  };

  const closePlagiaModal = () => {
    setIsPlagiaModalOpen(false);
  };

  return (
    <div className="flex">
      <main className="flex-grow bg-gray-100">
        <DashHeader />
        <div className="flex justify-between">
          <button
            onClick={openStudentModal}
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-DM py-2 px-4 rounded mt-4 ml-3 mb-3"
          >
            اضافة قسم
          </button>
          <button
            onClick={openPlagiaModal}
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-DM py-2 px-4 rounded mt-4 ml-3 mb-3"
          >
            الامانة العلمية
          </button>
          <h1 className='text-gray-800 text-5xl font-DM py-2 px-4 rounded mt-4 mr-4'>قائمة الطلبة</h1>
        </div>

        {/* Student Modal */}
        <Modal
          isOpen={isStudentModalOpen}
          onRequestClose={closeStudentModal}
          contentLabel="Student Modal"
        >
          <StudentForm />
          <button onClick={closeStudentModal}>اغلاق</button>
        </Modal>

        {/* Plagia Modal */}
        <Modal
          isOpen={isPlagiaModalOpen}
          onRequestClose={closePlagiaModal}
          contentLabel="Plagia Modal"
        >
          <Plagia />
          <button onClick={closePlagiaModal}>اغلاق</button>
        </Modal>
        {content}
      </main>
      <Sidebar />
      {/* Modal Component */}
      <Modal
        isOpen={false} // You need to set the state for modal visibility
        onRequestClose={() => {}} // Placeholder function
        contentLabel="Example Modal"
        ariaHideApp={false} // Fix for accessibility warnings
      >
        {/* Content of your modal */}
      </Modal>
    </div>
  );
};

export default NotesList;
