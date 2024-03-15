import React from 'react';
import Sidebar from '../../components/sidebareE';
import DashHeader from '../../components/DashHeader';

const Welcome = () => {
   return (
        
    <div className="flex h-screen">

      <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto"> 
        <DashHeader />
        <div
      className="flex justify-center items-center h-screen "
      dir="rtl" 
      style={{
        backgroundImage: 'url("../stud.jpg")',
        backgroundSize: 'cover', // You can adjust this based on your preference
        backgroundPosition: 'center', // You can adjust this based on your preference
      }}// Add dir attribute for right-to-left text
         >
 
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">مرحبا بك </h1>
            <h2 className="text-2xl">هنا ستجد كل ما تحتاجه في حقيبتك</h2>
          </div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default Welcome;
