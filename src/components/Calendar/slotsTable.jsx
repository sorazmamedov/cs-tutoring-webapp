import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import SlotsTableHeader from "./slotsTableHeader";

const SlotsTable = ({ theader, hours, timeSlot }) => {
  return (
    <Table className="text-muted text-center" size="sm" bordered responsive>
      {theader && <SlotsTableHeader headers={theader} />}
      <tbody>
        {hours.map((slotHour) => (
          <tr key={slotHour}>
            <td key={slotHour}>{slotHour}</td>
            {timeSlot.slots
              .filter(
                (slot) => `${slot.startHour}-${slot.endHour}` === slotHour
              )
              .map((data) => (
                <td
                  key={data.slotId}
                  // className={`${data.booked ? "booked" : "available"}`}
                >
                  <Button
                    disabled={data.booked}
                    className={`w-100 p-0 ${
                      data.booked ? "btn-secondary" : "primaryBtn"
                    }`}
                  >
                    {data.booked ? "-" : "+"}
                  </Button>
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SlotsTable;
