import { useState, useEffect } from "react";
import { useAddNewProjetMutation } from "../../notesApiSlice";
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

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setTeacherName('');
      setModule('');
    }
  }, [isSuccess, navigate]);

  const onSaveProjectClicked = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('teacherName', teacherName);
      formData.append('module', module);
      formData.append('studentId', studentId);
      formData.append('fileContent', pdfFile); // Assuming pdfFile is the actual file object

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
                {/* Input for teacher name */}
              </div>
              <div className="mb-4">
                <label htmlFor="module" className="block text-gray-700">المقياس:</label>
                {/* Input for module */}
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">العنوان:</label>
                {/* Input for title */}
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
              >
                حفظ
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

export default CreateQr;
