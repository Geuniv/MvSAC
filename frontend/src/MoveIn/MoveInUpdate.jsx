import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MoveInUpdate () {
    // const navigator = useNavigate();

    const { moveIn_id } = useParams(); 
    const [movein, setMovein] = useState(null);

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

    useEffect(() => {
        axios.get(`http://localhost:8000/movein/${moveIn_id}`)
        .then((response) => {
            setMovein(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError('전입신고 내역을 불러오는 데 실패했습니다.');
            setLoading(false);
        });
    }, [moveIn_id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:8000/movein/${moveIn_id}`,
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={name} name="name" type="text" placeholder={movein.name}/>
                <input onChange={handleChange} value={rrn} name="rrn" type="number" placeholder={movein.rrn}/>
                <input onChange={handleChange} value={email} name="email" type="text" placeholder={movein.email}/>
                <input onChange={handleChange} value={beforeAddr} name="beforeAddr" type="text" placeholder={movein.beforeAddr}/>
                <input onChange={handleChange} value={afterAddr} name="afterAddr" type="text" placeholder={movein.afterAddr}/>
                <input onChange={handleChange} value={moveInDt} name="moveInDt" type="date" placeholder={movein.moveInDt}/>
                <button type="submit">수정</button>
            </form>
        </>
    );
};