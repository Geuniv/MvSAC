import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    // useRef는 DOM을 직접적으로 조작할 수 있는 방법을 제공한다.
    // ref를 사용하여 input에 포커스를 줄 수 있다.
    const inputRef = useRef(); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = e => setUsername(e.target.value);
    const changePassword = e => setPassword(e.target.value);

    const handleSubmit = e => {
        // 리프레시 되는 것을 막기위해 기본동작을 막아준다.
        e.preventDefault(); 

        axios
            .post("http://localhost:8000/users/signin/", 
                { username, password },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    // 메시지를 출력 -> 토큰을 저장 -> 이벤트 목록으로 이동
                    alert(res.data.message);
                    window.sessionStorage.setItem("access_token", res.data.access_token);
                    window.sessionStorage.setItem("user_email", res.data.email);  // 추가됨
                    window.sessionStorage.setItem("user_id", res.data.user_id);   // 추가됨
                    window.sessionStorage.setItem("user_name", res.data.username);  // 추가됨
                    // 이동할 컴포넌트의 path 정보를 전달
                    navigate("/list");	
                }
            })
            .catch(err => {
                console.log(err);
                if (err.status === 401 || err.status === 404) {
                    alert("로그인에 실패했습니다.\n" + err.response.data.detail);
                } else {
                    alert("로그인에 실패했습니다.");
                }

                // 에러가 발생하면 input에 있는 값을 초기화
                setUsername('');
                setPassword('');
                
                // input에 포커스를 준다.
                inputRef.current.focus();
            });

    };

    return (
        <>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={inputRef} value={username} onChange={changeUsername} placeholder="이메일을 입력하세요." />
                <input type="password" value={password} onChange={changePassword} placeholder="패스워드를 입력하세요." />
                <button type="submit">로그인</button>
            </form>
        </>
    );
}