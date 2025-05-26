import React from "react";

function MoveInList({ data, onSelect }) {
  return (
    <ul>
      {data.map((item) => (
        <li
          key={item.id}
          onClick={() => onSelect(item)}
          style={{ cursor: "pointer", marginBottom: "10px" }}
        >
          {/* {item.username} - {item.afterAddr} */}
          {item.name} - {item.afterAddr} - {item.regDt}
        </li>
      ))}
    </ul>
  );
}

export default MoveInList;
