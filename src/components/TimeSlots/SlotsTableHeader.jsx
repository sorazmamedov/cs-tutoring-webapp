import React from "react";

const SlotsTableHeader = ({ headers }) => {
  return (
    <thead className="text-muted fw-bolder border-white">
      <tr className="p-0 m-0">
        {headers.map((cell, i) => (
          <td className="align-middle p-0 no-stretch" key={i}>
            <p className="p-0 m-0">{cell.split("-")[0]}</p>
            <p className="p-0 m-0">{cell.split("-")[1]}</p>
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default SlotsTableHeader;
