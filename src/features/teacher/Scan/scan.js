import React, { useState, useEffect } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useActivateProjectMutation } from "../../notesApiSlice";
import Sidebar from '../../../components/sidebareT';
import DashHeader from '../../../components/DashHeader';

const App = () => {
  const [activateProject, { 
    isLoading,
    isSuccess, 
    isError,
    error 
  }] = useActivateProjectMutation();

  const [id, setId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isProjectActivated, setIsProjectActivated] = useState(false);

  const handleDecode = (result) => {
    console.log(result);
    setId(result);
  };  

  const handleError = (error) => {
    console.log(error?.message);
  };

  const onSaveProjectClicked = async () => {
    try {
      await activateProject({
        id,
      });
      setIsProjectActivated(true); // Set to true after successful activation
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  useEffect(() => {
    if (id && !isProjectActivated) {
      onSaveProjectClicked();
    }
  }, [id, isProjectActivated]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("تم اضافة المرجع بنجاح");
    }
  }, [isSuccess]);

  return (
    <div className="flex h-screen">
     <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto"> 
         <DashHeader />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="w-64 h-64 mx-auto">
              <QrScanner onDecode={handleDecode} onError={handleError} />
            </div>
            
            {successMessage && (
            <div className="mt-4 text-center text-green-600">
              {successMessage}
            </div>
                    )}
          </div>
          <div className="text-xl text-blue-600">{id} :النيتحة</div>
        </div> 
      </main>
      <Sidebar />
    </div>
  );
};

export default App;
