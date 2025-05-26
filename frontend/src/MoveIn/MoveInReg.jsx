import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import MoveInList from "./MoveInList";
import MoveInPopup from "./MoveInPopup";

function MoveInReg() {
  const [moveInData, setMoveInData] = useState([]);
  const [selectedMoveIn, setSelectedMoveIn] = useState(null);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState({
    name: "",
    startDate: "",
    endDate: "",
    approval: "",
  });
 //이 부분에 userId를 받아야함
  const loggedInUserEmail = "hong@test.com";

  useEffect(() => {
    axios
      .get("http://localhost:8000/movein/")
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.userId === loggedInUserEmail
        );
        setMoveInData(filtered);
      })
      .catch(() => setError("데이터 로딩 중 오류 발생"));
  }, []);

  const filteredData = moveInData.filter((item) => {
    const regDate = item.regDt?.substring(0, 10);
    return (
      (!search.name || item.username.includes(search.name)) &&
      (!search.startDate || regDate >= search.startDate) &&
      (!search.endDate || regDate <= search.endDate) &&
      (!search.approval ||
        (search.approval === "승인" && item.isApproval === true) ||
        (search.approval === "반려" && item.isApproval === false) ||
        (search.approval === "대기" && item.isApproval === null))
    );
  });

  return (
    <div>
      <h1>{loggedInUserEmail} 담당 전입신청 목록</h1>

      <SearchBar search={search} setSearch={setSearch} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <MoveInList data={filteredData} onSelect={setSelectedMoveIn} />

      {selectedMoveIn && (
        <MoveInPopup data={selectedMoveIn} onClose={() => setSelectedMoveIn(null)} />
      )}
    </div>
  );
}

export default MoveInReg;
