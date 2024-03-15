import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from '../../usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { useUpdateProjetMutation } from '../../notesApiSlice';
import Sidebar from '../../../components/sidebareE';
import DashHeader from '../../../components/DashHeader';

const QRCodeGenerator = () => {
  const [updateProjet] = useUpdateProjetMutation();
  const navigate = useNavigate();
  const { data: users, isLoading, isSuccess, isError } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [module, setSelector3Value]= useState('Option 1'); // Add this line;
  const [teacherName, setSelector2Value] = useState('Option 1'); // Add this line;
  const [title, setSelector1Value] = useState('Option 1'); // Add this line;
  const [studentId, setStudentId] = useState('');
  const [pdfFile, setPdfFile] = useState(null);


  useEffect(() => {
    if (isSuccess) {
      setSelector1Value('');
      setSelector3Value('');
      setSelector2Value('');
      setStudentId('');
      setPdfFile(null);
    }
  }, [isSuccess, navigate]);

  const onPdfFileChange = (e) => setPdfFile(e.target.files[0]);

  let selector1Options;
  let selector2Options;
  let selector3Options;

  if (isSuccess) {
    selector1Options = users.ids?.map((userId) => {
      const user = users.entities[userId];
      if (user.roles === 'teacher') {
        return (
          <option key={userId} value={userId}>
            {user.username}
          </option>
        );
      }
      return null;
    });

    selector2Options = users.ids?.map((userId) => (
      <option key={userId} value={userId}>
        {users.entities[userId].module}
      </option>
    ));

    selector3Options = users.ids?.map((userId) => (
      <option key={userId} value={userId}>
        {users.entities[userId].title}
      </option>
    ));
  }

  const canSave = [title, module, teacherName, studentId, pdfFile].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await updateProjet({
          title: title,
          module: module,
          teacherName: teacherName,
          studentId: studentId,
          pdfFile: pdfFile,
        });

        // If the mutation is successful, navigate to the desired page
        navigate('/dashE');
      } catch (error) {
        // Handle any error that occurred during the mutation
        console.error('Error saving projet:', error);
      }
    }
  };
  return (
    <div>
      <div className="flex h-screen">
        <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto">
          <DashHeader />

          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full" dir="rtl">
              <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">
              تعديل رمز الاستجابة السريعة 
              </h1>

              <div className="mb-4">
                <label htmlFor="selector2" className="block text-gray-700">
                  المقياس:
                </label>
                <select
                  id="selector2"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={module}
                  onChange={(e) => setSelector3Value(e.target.value)}
                >
                  <option value="" disabled>
                    اختر المقياس
                  </option>
                  {selector2Options}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="selector2" className="block text-gray-700">
                  العنوان:
                </label>
                <select
                  id="selector2"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={title}
                  onChange={(e) => setSelector1Value(e.target.value)}
                >
                  <option value="" disabled>
                    اختر العنوان
                  </option>
                  {selector3Options}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="selector1" className="block text-gray-700">
                  الاستاذ:
                </label>
                <select
                  id="selector1"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={teacherName}
                  onChange={(e) => setSelector2Value(e.target.value)}
                >
                  <option value="" disabled>
                    اختر الاستاذ
                  </option>
                  {selector1Options}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="pdfFile" className="block text-gray-700">
                  تحميل البحث:
                </label>
                <input
                  type="file"
                  id="pdfFile"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={onPdfFileChange}
                />
              </div>

           
              <button
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ${
                  !canSave || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!canSave || isLoading}
                onClick={onSaveUserClicked}
              >
                 حفظ التعديل
              </button>
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default QRCodeGenerator