const TableHeader = ({ headers }) => {
  return (
    <thead className="text-muted fw-bolder border-white">
      <tr>
        {headers.map((cell, i) => (
          <td key={i}>{cell}</td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
