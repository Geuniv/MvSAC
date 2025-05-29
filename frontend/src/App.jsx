import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Header from './components/header';
import Login from './user/login';
import Signup from './user/signup';
import UserList from './user/UserList';
import MoveInListPage from './MoveIn/MoveInListPage';
import MoveInReg from './MoveIn/MoveInReg';
import Profile from './user/profile';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movelInReg" element={<MoveInReg />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/list" element={<MoveInListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};
export default App;