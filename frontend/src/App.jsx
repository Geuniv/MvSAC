<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> a5fb0f7db71cfbcfb0fb953782c3579e97dbbb27
