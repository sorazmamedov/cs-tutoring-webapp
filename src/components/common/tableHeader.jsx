import React from "react";

const TableHeader = ({ headers, darkTheme }) => {
  return (
    <thead className={darkTheme ? "" : "text-muted fw-bolder border-white"} >
      <tr>
        {headers.map((cell, i) => (
          <td key={i}>{cell}</td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
