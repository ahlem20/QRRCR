import { useState, useEffect } from "react";
import { useAddNewProjetTextMutation } from "../../../notesApiSlice";
import { useGetUsersQuery } from "../../../usersApiSlice";
import { useNavigate } from 'react-router-dom';

import useAuth from "../../../../hooks/useAuth";

const CreateProject = () => {
  const [addNewProjetText, { 
    isLoading,
    isSuccess,
    isError, 
    error 
  }] = useAddNewProjetTextMutation();
  
  const navigate = useNavigate();
  const { username } = useAuth();
  
  const [title, setTitle] = useState('');
  const [module, setModule] = useState(''); // Updated state variable name
  const [groop, setGroop] = useState(''); // Updated state variable name
  const [teacherName, setTeacherName] = useState(username); 
  // Fetch users data
  const { data: users } = useGetUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setModule('');
      setGroop('');
    }
  }, [isSuccess, navigate]);

  let moduleOptions;
  let groopOptions;

  if (users) {
    const moduleOptions = users?.ids?.map(userId => {
      const module = users.entities[userId].module;
      const studentId = users.entities[userId].teacherName;
      
      // Check if the username is "ahlem"
      if (studentId === username) {
        return (
          <option key={userId} value={module}>
            {module}
          </option>
        );
      }
      // Return null for other usernames
      return null;
    });
    
    const groopOptions = users?.ids?.map(userId => {
      const module = users.entities[userId].groop;
      const studentId = users.entities[userId].teacherName;
      
      // Check if the username is "ahlem"
      if (studentId === username) {
        return (
          <option key={userId} value={module}>
            {module}
          </option>
        );
      }
      // Return null for other usernames
      return null;
    });
   
  }

  const onTitleChanged = e => setTitle(e.target.value)

  const onGroopChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setGroop(values.map(String)); // Convert values to strings
  };
  
  const onModuleChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setModule(values.map(String)); // Convert values to strings
  };

  const canSave =
    [title, groop, module].every(Boolean) && !isLoading;

  const onSaveProjectClicked = async () => {
    try {
      await addNewProjetText({
        title,
        groop, // Fixed typo
        module,
        teacherName,
      });
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const errClass = isError ? "text-red-500" : "hidden";

  return (
    <div>
      <div className="flex h-screen">
        <main className="flex-grow bg-gray-100">
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full" dir="rtl">
              <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">
                انشاء تكليف جديد
              </h1>
              <div className="mb-4">
                <label htmlFor="note" className="block text-gray-700">
                  العنوان:
                </label>
                <input
                  type="text"
                  id="note"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل العنوان"
                  value={title}
                  onChange={onTitleChanged}
                />
              </div>


              <div className="mb-4">
                <label htmlFor="selector1" className="block text-gray-700">
                  المادة:
                </label>
                <select
                  id="selector1"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={module}
                  onChange={onModuleChanged}
                >
                  <option value="" disabled>Select an option</option>
                  {moduleOptions}
                </select>
              </div>



              <div className="mb-4">
                <label htmlFor="selector2" className="block text-gray-700">
                  الافواج المكلفة:
                </label>
                <select
                  id="selector2"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={groop}
                  onChange={onGroopChanged}// Fixed function name
                >
                  <option value="" disabled>Select an option</option>
                  {groopOptions}
                </select>
              </div>
              <button
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full"
                onClick={onSaveProjectClicked} // Fixed function name
                disabled={!canSave}
              >
                انشاء تكليف
              </button>
              {/* Display error message if there's an error */}
              <p className={errClass}>{error?.data?.message}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProject;
