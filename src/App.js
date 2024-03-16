import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import LoginT from './features/auth/LoginT';
import ChangePassWord from './features/auth/ChangePassWord';
import LoginS from './features/auth/LoginS';
import Subscribe from './features/auth/Subscrib';
import Welcomes from './features/student/welcomes';
import Welcomet from './features/teacher/welcomet'; 
import QRGeniratore from './features/student/CreatQr/CreatQr';
import Projet from './features/teacher/Projet/ProjetTable';
import Plagia from './features/teacher/plagia';
import Mynotes from './features/student/NoteTable/NoteTable'; 
import Myqrs from './features/student/MyQrs/QrsTable';
import Update from './features/student/MyQrs/updateQr';
import Upload from './features/student/uploadpdf';
import Scaner from './features/teacher/Scan/scan'; 
import Students from './features/teacher/Students/Students';
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="log_in" element={<LoginT />} />
        <Route path="login" element={<LoginS />} />
        <Route path="pass" element={<ChangePassWord />} />
        <Route path="subscribe" element={<Subscribe />}/>
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>

        <Route path="dashE">
           <Route index element={<Welcomes />}/>
           <Route  path="pdf" element={<Upload />}/>
           <Route path="qreniratore" element={<QRGeniratore />} />
           <Route path="update" element={<Update />} />
           <Route path="mynotes" element={<Mynotes />} />
           <Route path="myqrs" element={<Myqrs />} />
        </Route>


        <Route path="dashT">
           <Route index element={<Welcomet />}/>
          <Route path="projet" element={<Projet />} />
          <Route path="scaner" element={<Scaner />} />
          <Route path="students" element={<Students />} />
          <Route path="plagia" element={<Plagia />} />
        </Route>  

      </Route>   
    </Route>
    
    </Route>
    </Routes>
  );
}

export default App;
