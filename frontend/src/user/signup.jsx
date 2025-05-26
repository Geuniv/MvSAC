import axios from "axios"; // HTTP 요청을 위한 axios 임포트
import { useState, useRef } from "react"; // 상태 및 DOM 참조를 위한 훅
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

export default function Signup() {
    const navigate = useNavigate(); // 페이지 이동 함수
    const inputRef = useRef(); // 첫 번째 input에 포커스 주기 위해 ref 생성

    // 상태 선언
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null); // 파일 객체 저장
    const [role, setRole] = useState('N');  // 기본값: 일반 사용자

    // 상태 업데이트 함수
    const changeUsername = e => setUsername(e.target.value);
    const changeEmail = e => setEmail(e.target.value);
    const changePassword = e => setPassword(e.target.value);
    const changeRole = e => setRole(e.target.value);
    const changeFile = e => setFile(e.target.files[0]); // 선택된 파일 저장

    // 폼 제출 처리 함수
    const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    // ✅ 백엔드에서 data: Form(...) 으로 받을 경우, JSON 문자열로 전달
    formData.append("data", JSON.stringify({
        username,
        email,
        password,
        role
    }));

    if (file) formData.append("image", file); // ✅ 파일 필드명도 맞춰줌

    axios
        .post("http://localhost:8000/users/signup", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
            if (res.status === 201) {
                alert(res.data.message);
                navigate("/login");
            }
        })
        .catch(err => {
            console.error(err);
            alert("회원가입에 실패했습니다.");
            inputRef.current.focus();
        });
};

    return (
        <>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" ref={inputRef} value={username} onChange={changeUsername} placeholder="이름" required />
                <input type="email" value={email} onChange={changeEmail} placeholder="이메일" required />
                <input type="password" value={password} onChange={changePassword} placeholder="비밀번호" required />
                <select value={role} onChange={changeRole}>
                    <option value="N">일반 사용자</option>
                    <option value="Y">관리자</option>
                </select>
                <input type="file" onChange={changeFile} /> {/* 파일 선택 */}
                <button type="submit">회원가입</button>
            </form>
        </>
    );
}