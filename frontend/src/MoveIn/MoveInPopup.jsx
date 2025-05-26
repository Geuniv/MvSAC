import React from "react";

function MoveInPopup({ data, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>전입 상세 정보</h2>
        <p><strong>이름:</strong> {data.username}</p>
        <p><strong>주민등록번호:</strong> {data.rrn}</p>
        <p><strong>이메일:</strong> {data.email}</p>
        <p><strong>이전 주소:</strong> {data.beforeAddr}</p>
        <p><strong>이후 주소:</strong> {data.afterAddr}</p>
        <p><strong>등록일:</strong> {data.regDt}</p>
        <p><strong>입주일:</strong> {data.moveInDt}</p>
        <p><strong>승인일:</strong> {data.approvalDt || "미승인"}</p>
        <p><strong>승인여부:</strong> {
          data.isApproval === null ? "대기" :
          data.isApproval ? "승인" : "반려"
        }</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default MoveInPopup;
