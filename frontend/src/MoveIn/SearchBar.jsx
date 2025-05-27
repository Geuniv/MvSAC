import React from "react";

function SearchBar({ search, setSearch }) {
  const reset = () =>
    setSearch({ name: "", startDate: "", endDate: "", approval: "" });

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="이름 검색"
        value={search.name}
        onChange={(e) => setSearch({ ...search, name: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <input
        type="date"
        value={search.startDate}
        onChange={(e) => setSearch({ ...search, startDate: e.target.value })}
        style={{ marginRight: "5px" }}
      />
      <span>~</span>
      <input
        type="date"
        value={search.endDate}
        onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
        style={{ marginLeft: "5px", marginRight: "10px" }}
      />
      <select
        value={search.approval}
        onChange={(e) => setSearch({ ...search, approval: e.target.value })}
        style={{ marginRight: "10px" }}
      >
        <option value="">승인여부 전체</option>
        <option value="승인">승인</option>
        <option value="대기">대기</option>
      </select>
      <button onClick={reset}>초기화</button>
    </div>
  );
}

export default SearchBar;
