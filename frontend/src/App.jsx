// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [moveInData, setMoveInData] = useState([]);
//   const [selectedMoveIn, setSelectedMoveIn] = useState(null);
//   const [error, setError] = useState(null);

//   // 검색 조건 상태
//   const [searchName, setSearchName] = useState("");
//   const [searchStartDate, setSearchStartDate] = useState("");
//   const [searchEndDate, setSearchEndDate] = useState("");
//   const [searchApproval, setSearchApproval] = useState("");

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
//       .catch((err) => {
//         console.error("데이터 불러오기 실패:", err);
//         setError("데이터 로딩 중 오류 발생");
//       });
//   }, []);

//   const filteredData = moveInData.filter((item) => {
//     const regDate = item.regDt?.substring(0, 10);
//     return (
//       (!searchName || item.username.includes(searchName)) &&
//       (!searchStartDate || regDate >= searchStartDate) &&
//       (!searchEndDate || regDate <= searchEndDate) &&
//       (!searchApproval ||
//         (searchApproval === "승인" && item.isApproval === true) ||
//         (searchApproval === "반려" && item.isApproval === false) ||
//         (searchApproval === "대기" && item.isApproval === null))
//     );
//   });

//   // 검색 조건 초기화
//   const resetSearch = () => {
//     setSearchName("");
//     setSearchStartDate("");
//     setSearchEndDate("");
//     setSearchApproval("");
//   };

//   const closePopup = () => setSelectedMoveIn(null);

//   return (
//     <div className="App">
//       <h1>{loggedInUserEmail} 담당 전입신청 목록</h1>

//       {/* 검색창 */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="이름 검색"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="date"
//           value={searchStartDate}
//           onChange={(e) => setSearchStartDate(e.target.value)}
//           style={{ marginRight: "5px" }}
//         />
//         <span>~</span>
//         <input
//           type="date"
//           value={searchEndDate}
//           onChange={(e) => setSearchEndDate(e.target.value)}
//           style={{ marginLeft: "5px", marginRight: "10px" }}
//         />
//         <select
//           value={searchApproval}
//           onChange={(e) => setSearchApproval(e.target.value)}
//           style={{ marginRight: "10px" }}
//         >
//           <option value="">승인여부 전체</option>
//           <option value="승인">승인</option>
//           <option value="반려">반려</option>
//           <option value="대기">대기</option>
//         </select>
//         <button onClick={resetSearch}>초기화</button>
//       </div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* 리스트 */}
//       <ul>
//         {filteredData.map((item) => (
//           <li
//             key={item.id}
//             onClick={() => setSelectedMoveIn(item)}
//             style={{ cursor: "pointer", marginBottom: "10px" }}
//           >
//             {item.username} - {item.afterAddr}
//           </li>
//         ))}
//       </ul>

//       {/* 팝업 */}
//       {selectedMoveIn && (
//         <div className="popup">
//           <div className="popup-content">
//             <h2>전입 상세 정보</h2>
//             <p><strong>이름:</strong> {selectedMoveIn.username}</p>
//             <p><strong>주민등록번호:</strong> {selectedMoveIn.rrn}</p>
//             <p><strong>이메일:</strong> {selectedMoveIn.email}</p>
//             <p><strong>이전 주소:</strong> {selectedMoveIn.beforeAddr}</p>
//             <p><strong>이후 주소:</strong> {selectedMoveIn.afterAddr}</p>
//             <p><strong>등록일:</strong> {selectedMoveIn.regDt}</p>
//             <p><strong>입주일:</strong> {selectedMoveIn.moveInDt}</p>
//             <p><strong>승인일:</strong> {selectedMoveIn.approvalDt || "미승인"}</p>
//             <p><strong>승인여부:</strong> {
//               selectedMoveIn.isApproval === null ? "대기" :
//               selectedMoveIn.isApproval ? "승인" : "반려"
//             }</p>
//             <button onClick={closePopup}>닫기</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React from "react";
import MoveInReg from "./MoveIn/MoveInReg";

function App() {
  return <MoveInReg />;
}

export default App;
