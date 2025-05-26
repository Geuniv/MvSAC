import React from "react";

function MoveInPopup({ data, onClose }) {
  return (
    <div className="popup" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>전입신청 상세정보</h3>
        <p><strong>이름:</strong> {data.name}</p>
        <p><strong>이메일:</strong> {data.email}</p>
        <p><strong>주민번호:</strong> {data.rrn}</p>
        <p><strong>이전 주소:</strong> {data.beforeAddr}</p>
        <p><strong>신규 주소:</strong> {data.afterAddr}</p>
        <p><strong>등록일:</strong> {data.regDt}</p>
        <p><strong>입주일:</strong> {data.moveInDt}</p>
        <p><strong>승인일:</strong> {data.approvalDt || "미승인"}</p>
        <p><strong>승인여부:</strong> {
          data.isApproval === true ? "승인" : "대기"}
        </p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default MoveInPopup;
