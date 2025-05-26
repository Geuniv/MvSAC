import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import MoveInList from "./MoveInList";
import MoveInPopup from "./MoveInPopup";

function MoveInListPage() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMoveIn, setSelectedMoveIn] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({
    name: "",
    startDate: "",
    endDate: "",
    approval: "",
  });

  const loggedInUserId = parseInt(window.sessionStorage.getItem("user_id"), 10);
  const loggedInUserName = window.sessionStorage.getItem("user_name");
  const accessToken = window.sessionStorage.getItem("access_token"); // 토큰 추가
  console.log(" accessToken:", accessToken);

  useEffect(() => {
    console.log(" [Axios 요청 직전] Authorization Header:", `Bearer ${accessToken}`);

    axios
      .get("http://localhost:8000/movein/", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
        },
      })
      .then((res) => {
        console.log(res);
        console.log("전체 데이터:", res.data);
        console.log("로그인 ID:", loggedInUserId);

        // userId가 로그인한 사람과 일치하는 데이터만 추출
        const userData = res.data.filter(item => item.userId === loggedInUserId);
        console.log("로그인 유저의 전입신청 목록:", userData);

        setAllData(userData);
      })
      .catch((err) => {
        console.error(err);
        setError("데이터 로딩 중 오류 발생");
      });
  }, [loggedInUserId]);

  useEffect(() => {
    const result = allData.filter(item => {
      const regDate = item.regDt?.substring(0, 10);
      return (
        (!search.name || item.name?.includes(search.name)) &&
        (!search.startDate || regDate >= search.startDate) &&
        (!search.endDate || regDate <= search.endDate) &&
        (!search.approval ||
          (search.approval === "승인" && item.isApproval === true) ||
          (search.approval === "대기" && item.isApproval === null))
      );
    });
    setFilteredData(result);
  }, [search, allData]);

  return (
    <div>
      <h1>{loggedInUserName || "알 수 없음"} 담당 전입신청 목록</h1>
      <SearchBar search={search} setSearch={setSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MoveInList data={filteredData} onSelect={setSelectedMoveIn} />
      {selectedMoveIn && (
        <MoveInPopup data={selectedMoveIn} onClose={() => setSelectedMoveIn(null)} />
      )}
    </div>
  );
}

export default MoveInListPage;
