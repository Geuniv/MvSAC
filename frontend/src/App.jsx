import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Login from './user/login'
import Signup from './user/signup';

// function Layout() {
//     const [isLogin, setIsLogin] = useState(false);

//     const handleLogout = () => {
//         window.sessionStorage.removeItem("access_token");
//         setIsLogin(false);
//     };

//     const navigate = useNavigate();
    
//     useEffect(() => {
//         const token = window.sessionStorage.getItem("access_token");
//         if (token) {
//             setIsLogin(true);
//         } else {
//             setIsLogin(false);
//         }
//     });

//     useEffect(() => {
//         if(isLogin) {
//             navigate("/list");
//         } else {
//             navigate("/login");
//         }
//     }, [isLogin]);

//     return (
//         <>
//             <h1>이벤트 관리 시스템</h1>
//             <hr />
//             <header>
//                 {
//                     isLogin ? (
//                         <a onClick={handleLogout}>로그아웃</a>
//                     ) : (
//                         <Link to="/login">로그인</Link>
//                     )
//                 }
//             </header>
//             <main>
//                 <Outlet />
//             </main>
//             <footer>
//                 <p>이벤트 관리 시스템 © 2023</p>
//             </footer>
//         </>
//     );
// }
import MoveInReg from './MoveIn/MoveInReg'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
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
      </p> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      <MoveInReg />
    </>
  )
}

export default App
