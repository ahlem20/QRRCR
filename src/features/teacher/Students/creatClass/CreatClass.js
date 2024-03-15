import React, { useState, useEffect } from 'react';
import { useCreateNewStudentMutation } from '../../../usersApiSlice';
import { useNavigate } from 'react-router-dom';

import useAuth from "../../../../hooks/useAuth";
const CreatClass = () => {
  const [createNewStudent, { 
    isLoading,
    isSuccess,
    isError, 
    error 
  }] = useCreateNewStudentMutation();
  
  const navigate = useNavigate();
  const { username } = useAuth();
  const [teacherName, setTeacherName] = useState(username); 
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState(''); 
  const [departement, setDepartement] = useState(''); 
  const [spicaility, setSpicaility] = useState(''); 
  const [annee, setAnnee] = useState(''); 
  const [groop, setGroup] = useState('');
  const [module, setModule] = useState('');
  const [tableData, setTableData] = useState([{ username: '', matricule: '' }]);
  const [inputFields, setInputFields] = useState([{ id: Math.random(), value: '' }]);

  useEffect(() => {
    if (isSuccess) {
      setUniversity("");
      setFaculty("");
      setDepartement("");
      setSpicaility("");
      setAnnee("");
      setGroup("");
      setModule("");
      setTableData([{ username: '', matricule: '' }]);
    }
  }, [isSuccess, navigate]);

  const canSave =
    [university, faculty, departement, spicaility, module,annee, groop].every(Boolean) && !isLoading;

  const addRow = () => {
    setInputFields([...inputFields, { id: Math.random(), value: '' }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const onSaveProjectClicked = async () => {
    try {
      await Promise.all(tableData.map(async (row) => {
        await createNewStudent({
          username: row.username,
          password: row.username,
          roles: "student",
          university,
          faculty,
          module,
          departement,
          spicaility,
          annee,
          teacherName,
          groop,
          matricule: row.matricule,
        });
      }));
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const addData = () => {
    const newData = inputFields.map(({ value }) => ({ username: value, matricule: '' }));
    setTableData([...tableData, ...newData]);
  };

  const removeData = (index) => {
    const data = [...tableData];
    data.splice(index, 1);
    setTableData(data);
  };

  const errClass = isError ? "text-red-500" : "hidden";

  return (
    <div>
      <div className="flex  h-screen">
        <main className="flex-grow bg-gray-100">

          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full" dir="rtl">
              <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">
                انشاء قسم جديد
              </h1>
              <div className="mb-4">
                <label htmlFor="university" className="block text-gray-700">
                  الجامعة:
                </label>
                <input
                  type="text"
                  id="university"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل الجامعة"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div> 
              <div className="mb-4">
                <label htmlFor="faculty" className="block text-gray-700">
                  الكلية:
                </label>
                <input
                  type="text"
                  id="faculty"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل الكلية"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div> 
              <div className="mb-4">
                <label htmlFor="departement" className="block text-gray-700">
                  القسم:
                </label>
                <input
                  type="text"
                  id="departement"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل القسم"
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="spicaility" className="block text-gray-700">
                  التخصص:
                </label>
                <input
                  type="text"
                  id="spicaility"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل التخصص"
                  value={spicaility}
                  onChange={(e) => setSpicaility(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="annee" className="block text-gray-700">
                  السنة:
                </label>
                <input
                  type="text"
                  id="annee"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل السنة"
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="groop" className="block text-gray-700">
                  المقياس:
                </label>
                <input
                  type="text"
                  id="module"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل المقياس"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="groop" className="block text-gray-700">
                  المجموعة:
                </label>
                <input
                  type="text"
                  id="groop"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="أدخل المجموعة"
                  value={groop}
                  onChange={(e) => setGroup(e.target.value)}
                />
              </div>
             
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100" dir='rtl'>
                    <th className="p-2 text-center" dir='rtl'>الاسم كامل</th>
                    <th className="p-2 text-center" dir='rtl'>رقم التسجيل</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="p-2 border border-gray-300">
                        <input
                          type="text"
                          className="w-full border-none bg-transparent focus:outline-none"
                          value={data.username}
                          onChange={(e) => {
                            const newData = [...tableData];
                            newData[index].username = e.target.value;
                            setTableData(newData);
                          }}
                        />
                      </td>
                      <td className="p-2 border border-gray-300">
                        <input
                          type="text"
                          className="w-full border-none bg-transparent focus:outline-none"
                          value={data.matricule}
                          onChange={(e) => {
                            const newData = [...tableData];
                            newData[index].matricule = e.target.value;
                            setTableData(newData);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inputFields.map((inputField, index) => (
                <div key={inputField.id} className="mb-4 mt-4 flex">
                  <button className="bg-red-500 text-white p-2 pr-4 pl-4 rounded hover:bg-red-600" onClick={() => removeData(index)}>مسح صف</button>
                  <button className="bg-green-500 text-white p-2 pr-4 pl-4 mr-6 rounded hover:bg-green-600" onClick={() => addData()}>اضافة صف </button>
</div>
              ))}
              <button
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mt-3 w-full"
                onClick={onSaveProjectClicked}
                disabled={!canSave}
              >
                انشاء القسم
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

export default CreatClass;
