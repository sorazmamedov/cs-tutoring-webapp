import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainContainer from "../common/MainContainer";
import TableHeader from "../CustomTable/TableHeader";
import CustomPagination from "../CustomPagination";
import { getSlots, getHours } from "../../utils/slots";
import { useState } from "react";

const TimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState(getSlots);
  const hours = getHours();

  const header = [
    "Tutor",
    "Between",
    "January 1, 2022 Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const tableHeaderDate = [
    "",
    "January 1, 2022",
    "January 2, 2022",
    "January 3, 2022",
    "January 4, 2022",
    "January 5, 2022",
    "January 6, 2022",
  ];

  return (
    <MainContainer title="Time Slots">
      <Row>
        <Col sm={2} className="pe-0">
          <Table
            className="text-muted text-center"
            size="sm"
            bordered
            hover
            responsive
          >
            {header && <TableHeader headers={[header[0]]} />}
            <tbody>
              {timeSlots.length > 0 &&
                timeSlots.map((tutor) => (
                  <tr id={tutor.id} key={tutor.id}>
                    <td>{tutor.name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <Col sm={10} className="ps-0">
          <Table
            className="text-muted text-center"
            size="sm"
            bordered
            hover
            responsive
          >
            {tableHeaderDate && <TableHeader headers={tableHeaderDate} />}
            {header && <TableHeader headers={header.slice(1)} />}
            <tbody>
              {hours.map((slotHour) => (
                <tr key={slotHour}>
                  <td key={slotHour}>{slotHour}</td>
                  {timeSlots.length > 0 &&
                    timeSlots[0].slots
                      .filter((slot) => {
                        if (`${slot.startHour}-${slot.endHour}` === slotHour) {
                          return slot;
                        }
                      })
                      .map((data) => <td key={data.slotId}>{data.slotId}</td>)}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <CustomPagination />
    </MainContainer>
  );
};

export default TimeSlots;
