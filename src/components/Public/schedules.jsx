import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import CustomPagination from "../common/customPagination";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import useAxios from "../../hooks/useAxios";
import { GlobalViewContext } from "../../Context/dataContext";

const Schedules = () => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [schedules, setSchedules] = useState([]);
  const header = ["Day", "From", "To", "Tutor"];

  const fetchSchedules = () => {
    axiosFetch({
      method: "GET",
      url: "/schedules/public",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id) {
      fetchSchedules();
      console.log("[Fetching public schedules]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setSchedules([...data]);
  }, [data]);

  return (
    <MainContainer>
      {!loading && !error && <TitleBar title="Schedules" />}
      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && schedules && schedules.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !error && schedules && schedules.length !== 0 && (
        <>
          <Table className="text-center" bordered hover responsive>
            <TableHeader headers={header} />
            <tbody className="text-muted">
              {schedules.sort(compare).map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.day}</td>
                  <td>{schedule.startHour}</td>
                  <td>{schedule.endHour}</td>
                  <td>{`${schedule.tutor.firstName} ${schedule.tutor.lastName}`}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
    </MainContainer>
  );
};

export default Schedules;

function compare(a, b) {
  const days = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  return days[a.day] - days[b.day];
}