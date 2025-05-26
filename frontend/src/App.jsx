import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Login from './user/login';
import Signup from './user/signup';
import MoveInListPage from "./MoveIn/MoveInListPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<MoveInListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};
export default App;