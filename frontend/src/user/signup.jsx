import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const inputRef = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 🔹 확인용 비밀번호 추가
    const [file, setFile] = useState(null);
    const [role, setRole] = useState('N');

    const changeUsername = e => setUsername(e.target.value);
    const changeEmail = e => setEmail(e.target.value);
    const changePassword = e => setPassword(e.target.value);
    const changeConfirmPassword = e => setConfirmPassword(e.target.value); // 🔹
    const changeRole = e => setRole(e.target.value);
    const changeFile = e => setFile(e.target.files[0]);

    const handleSubmit = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify({
            username,
            email,
            password,
            role
        }));

        if (file) formData.append("image", file);

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
                <input type="password" value={confirmPassword} onChange={changeConfirmPassword} placeholder="비밀번호 확인" required /> {/* 🔹 */}
                {/* <select value={role} onChange={changeRole}>
                    <option value="N">일반 사용자</option>
                    <option value="Y">관리자</option>
                </select> */}
                <input type="file" onChange={changeFile} />
                <button type="submit">회원가입</button>
            </form>
        </>
    );
}