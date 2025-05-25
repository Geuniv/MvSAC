import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MoveInReg () {
    // const navigator = useNavigate();

    const [ form, setForm ] = useState({
        name: "",
        rrn: "",
        email: "",
        beforeAddr: '',
        afterAddr: '',
        moveInDt: ''
    });

    const { name, rrn, email, beforeAddr, afterAddr, moveInDt } = form;

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/movein/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(res => {
            console.log(res);
            if (res.status === 201) {
                    alert(res.data.message);
                    // navigator("/list");
                }
        })
        .catch(err => {
            console.log(err);
            alert("전입 등록 실패")
        })
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={name} name="name" type="text" placeholder='신청자 이름 입력'/>
                <input onChange={handleChange} value={rrn} name="rrn" type="number" placeholder='주민번호 입력'/>
                <input onChange={handleChange} value={email} name="email" type="text" placeholder='이메일 입력'/>
                <input onChange={handleChange} value={beforeAddr} name="beforeAddr" type="text" placeholder='입주 전 주소'/>
                <input onChange={handleChange} value={afterAddr} name="afterAddr" type="text" placeholder='입주 후 주소'/>
                <input onChange={handleChange} value={moveInDt} name="moveInDt" type="date" placeholder='입주 예정일'/>
                <button type="submit">등록</button>
            </form>
        </>
    )
}