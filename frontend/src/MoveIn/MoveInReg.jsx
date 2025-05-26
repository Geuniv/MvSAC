// import axios from 'axios';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MoveInReg () {
//     // const navigator = useNavigate();

//     const [ form, setForm ] = useState({
//         name: "",
//         rrn: "",
//         email: "",
//         beforeAddr: '',
//         afterAddr: '',
//         moveInDt: ''
//     });

//     const { name, rrn, email, beforeAddr, afterAddr, moveInDt } = form;

//     const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

//     const handleSubmit = e => {
//         e.preventDefault();
//         axios
//         .post("http://localhost:8000/movein/",
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             }
//         )
//         .then(res => {
//             console.log(res);
//             if (res.status === 201) {
//                     alert(res.data.message);
//                     // navigator("/list");
//                 }
//         })
//         .catch(err => {
//             console.log(err);
//             alert("전입 등록 실패")
//         })
//     }
//     return(
//         <>
//             <form onSubmit={handleSubmit}>
//                 <input onChange={handleChange} value={name} name="name" type="text" placeholder='신청자 이름 입력'/>
//                 <input onChange={handleChange} value={rrn} name="rrn" type="number" placeholder='주민번호 입력'/>
//                 <input onChange={handleChange} value={email} name="email" type="text" placeholder='이메일 입력'/>
//                 <input onChange={handleChange} value={beforeAddr} name="beforeAddr" type="text" placeholder='입주 전 주소'/>
//                 <input onChange={handleChange} value={afterAddr} name="afterAddr" type="text" placeholder='입주 후 주소'/>
//                 <input onChange={handleChange} value={moveInDt} name="moveInDt" type="date" placeholder='입주 예정일'/>
//                 <button type="submit">등록</button>
//             </form>
//         </>
//     )
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
// import MoveInList from "./MoveInList";
// import MoveInPopup from "./MoveInPopup";

// function MoveInReg() {
//   const [moveInData, setMoveInData] = useState([]);
//   const [selectedMoveIn, setSelectedMoveIn] = useState(null);
//   const [error, setError] = useState(null);

//   const [search, setSearch] = useState({
//     name: "",
//     startDate: "",
//     endDate: "",
//     approval: "",
//   });
//  //이 부분에 userId를 받아야함
//   const loggedInUserEmail = "hong@test.com";

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/movein/")
//       .then((res) => {
//         const filtered = res.data.filter(
//           (item) => item.userId === loggedInUserEmail
//         );
//         setMoveInData(filtered);
//       })
//       .catch(() => setError("데이터 로딩 중 오류 발생"));
//   }, []);

//   const filteredData = moveInData.filter((item) => {
//     const regDate = item.regDt?.substring(0, 10);
//     return (
//       (!search.name || item.username.includes(search.name)) &&
//       (!search.startDate || regDate >= search.startDate) &&
//       (!search.endDate || regDate <= search.endDate) &&
//       (!search.approval ||
//         (search.approval === "승인" && item.isApproval === true) ||
//         (search.approval === "반려" && item.isApproval === false) ||
//         (search.approval === "대기" && item.isApproval === null))
//     );
//   });

//   return (
//     <div>
//       <h1>{loggedInUserEmail} 담당 전입신청 목록</h1>

//       <SearchBar search={search} setSearch={setSearch} />

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <MoveInList data={filteredData} onSelect={setSelectedMoveIn} />

//       {selectedMoveIn && (
//         <MoveInPopup data={selectedMoveIn} onClose={() => setSelectedMoveIn(null)} />
//       )}
//     </div>
//   );
// }

// export default MoveInReg;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
// import MoveInList from "./MoveInList";
// import MoveInPopup from "./MoveInPopup";


// function MoveInReg() {
//   const [moveInData, setMoveInData] = useState([]);
//   const [selectedMoveIn, setSelectedMoveIn] = useState(null);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState({
//     name: "",
//     startDate: "",
//     endDate: "",
//     approval: "",
//   });

//   const loggedInUserEmail = window.sessionStorage.getItem("user_email");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/movein/")
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//         const filtered = res.data.filter(
//           (item) => item.userId === loggedInUserEmail
//         );
//         setMoveInData(filtered);
//       })
//       .catch(() => setError("데이터 로딩 중 오류 발생"));
//   }, []);

//   const filteredData = moveInData.filter((item) => {
//     const regDate = item.regDt?.substring(0, 10);
//     return (
//       (!search.name || item.name.includes(search.name)) &&
//       (!search.startDate || regDate >= search.startDate) &&
//       (!search.endDate || regDate <= search.endDate) &&
//       (!search.approval ||
//         (search.approval === "승인" && item.isApproval === true) ||
//         (search.approval === "반려" && item.isApproval === false) ||
//         (search.approval === "대기" && item.isApproval === null))
//     );
//   });

//   return (
//     <div>
//       <h1>{loggedInUserEmail} 담당 전입신청 목록</h1>
//       <SearchBar search={search} setSearch={setSearch} />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <MoveInList data={filteredData} onSelect={setSelectedMoveIn} />
//       {selectedMoveIn && (
//         <MoveInPopup data={selectedMoveIn} onClose={() => setSelectedMoveIn(null)} />
//       )}
//     </div>
//   );
// }
// export default MoveInReg;