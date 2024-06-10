import { useState, useEffect } from "react";
import { useAddNewProjetMutation } from "../../notesApiSlice";
import { useGetNotesQuery } from "../../notesApiSlice";
import { useNavigate } from 'react-router-dom';

import useAuth from "../../../hooks/useAuth";
import Sidebar from '../../../components/sidebareE';
import DashHeader from '../../../components/DashHeader';

const CreateQr = () => {
  const [addNewProjet, { isLoading, isSuccess, isError, error }] = useAddNewProjetMutation();
  const { username } = useAuth();
  const navigate = useNavigate();
  const [module, setModule] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [title, setTitle] = useState('');
  const [studentId, setStudentId] = useState(username); 
  const [pdfFile, setPdfFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsDataURL(file);
  };
  const { data: notes } = useGetNotesQuery();

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setTeacherName('');
      setModule('');
    }
  }, [isSuccess, navigate]);

  const moduleOptions = notes?.ids?.map(userId => {
    const module = notes.entities[userId].module;
    const studentId = notes.entities[userId].studentId;
    
    // Check if the username is "ahlem"
    if (studentId === undefined) {
      return (
        <option key={userId} value={module}>
          {module}
        </option>
      );
    }
    // Return null for other usernames
    return null;
  });
  
  const teacherNameOptions = notes?.ids?.map(userId => {
    const teacherName = notes.entities[userId].teacherName;
    const studentId = notes.entities[userId].studentId;
    
    // Check if the username is "ahlem"
    if (studentId === undefined) {
      return (
        <option key={userId} value={teacherName}>
          {teacherName}
        </option>
      );
    }
    // Return null for other usernames
    return null;
  });
  
  const titleOptions = notes?.ids?.map(userId => {
    const title = notes.entities[userId].title;
    const studentId = notes.entities[userId].studentId;
    
    // Check if the username is "ahlem"
    if (studentId === undefined) {
      return (
        <option key={userId} value={title}>
          {title}
        </option>
      );
    }
    // Return null for other usernames
    return null;
  });
  


  const onSaveProjectClicked = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('teacherName', teacherName);
      formData.append('module', module);
      formData.append('studentId', studentId);
      formData.append('pdfFile', pdfFile); // Append the PDF file

      await addNewProjet(formData);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const canSave = [title, teacherName, module, pdfFile].every(Boolean) && !isLoading;

  return (
    <div>
      <div className="flex h-screen">
        <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto">
          <DashHeader />
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full" dir="rtl">
              <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">رمز الاستجابة السريعة</h1>
              <div className="mb-4">
                <label htmlFor="teacherName" className="block text-gray-700">الاستاذ:</label>
                <select
                  id="teacherName"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={teacherName}
                  onChange={e => setTeacherName(e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {teacherNameOptions}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="module" className="block text-gray-700">المقياس:</label>
                <select
                  id="module"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={module}
                  onChange={e => setModule(e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {moduleOptions}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">العنوان:</label>
                <select
                  id="title"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {titleOptions}
                </select>
              </div>
            
               <div className="mb-4">
                <label htmlFor="pdfFile" className="block text-gray-700">تحميل البحث:</label>
                <input
                  type="file"
                  id="pdfFile"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={e => setPdfFile(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ${!canSave ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!canSave}
                onClick={onSaveProjectClicked}
              >حفظ
              </button>
              {isError && <p className="text-red-500">Error saving project: {error.message}</p>}
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default CreateQr
