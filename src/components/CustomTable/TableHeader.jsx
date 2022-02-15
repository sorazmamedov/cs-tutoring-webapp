const TableHeader = ({ headers }) => {
  return (
    <thead className="text-muted">
      <tr>
        {headers.map((cell, i) => (
          <th key={i}>{cell}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
