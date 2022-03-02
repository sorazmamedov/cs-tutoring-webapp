import Table from "react-bootstrap/Table";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const CustomTable = ({ data }) => {
  const { tableClasses, tBodyClasses, tableHeader, tableBody } = data;

  return (
    <Table className={tableClasses} bordered hover responsive>
      {tableHeader && <TableHead headers={tableHeader} />}
      <TableBody data={{ classes: tBodyClasses, rows: tableBody }} />
    </Table>
  );
};

export default CustomTable;
