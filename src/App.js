import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUser from './Components/CreateUser';
import Navbar from './Components/Navbar';
import UserData from './Components/UserData';
import UpdateUser from './Components/UpdateUser';

const App = () => {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<UserData />} />
        <Route path='/adduser' element={<CreateUser />} />
        <Route path='/updateuser/:id' element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
