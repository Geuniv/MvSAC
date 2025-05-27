import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Login from './user/login';
import Signup from './user/signup';
import MoveInReg from './MoveIn/MoveInReg'
import List from './List';
import Profile from './user/profile';

function Layout() {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogout = () => {
        window.sessionStorage.removeItem("access_token");
        setIsLogin(false);
    };

    const navigate = useNavigate();
    
    useEffect(() => {
        const token = window.sessionStorage.getItem("access_token");
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    });

    useEffect(() => {
        if(isLogin) {
            navigate("/list");
        } else {
            navigate("/login");
        }
    }, [isLogin]);

    return (
        <>
            <h1>이벤트 관리 시스템</h1>
            <hr />
            <header>
                {
                    isLogin ? (
                        <a onClick={handleLogout}>로그아웃</a>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )
                }
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>이벤트 관리 시스템 © 2023</p>
            </footer>
        </>
    );
}
import MoveInListPage from "./MoveIn/MoveInListPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movelInReg" element={<MoveInReg />} /> 
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<MoveInListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};
export default App;