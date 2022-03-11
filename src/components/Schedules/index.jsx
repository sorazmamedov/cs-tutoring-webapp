import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
import ScheduleRows from "./scheduleRows";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { GlobalViewContext } from "../Context/dataContext";
import TitleBar from "../common/titleBar";
import Id from "../../utils/Id";
import axios from "../../apis/cs-tutoring";
import useAxios from "../../hooks/useAxios";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";

const Schedules = () => {
  const [data, error, loading, axiosFetch] = useAxios();
  // const error = false;
  // const loading = false;
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  // const data = [
  //   {
  //     id: "kTMSq6018qGj",
  //     day: "Monday",
  //     startHour: "9:00 a.m.",
  //     endHour: "1:00 p.m.",
  //     tutor: {
  //       id: "wx-nWZPAX1TC",
  //       name: "Alin",
  //     },
  //     location: "https://www.youtube.com/watch?v=3imO7PFU5cI",
  //     isActive: false,
  //   },
  //   {
  //     id: "abMSq6018qGj",
  //     day: "Monday",
  //     startHour: "1:00 p.m.",
  //     endHour: "5:00 p.m.",
  //     tutor: { id: "2ZXHi4q7J_9m", name: "Andrew" },
  //     location: "https://www.youtube.com/watch?v=_v98All94pc",
  //     isActive: false,
  //   },
  //   {
  //     id: "kTMSq6018q78",
  //     day: "Tuesday",
  //     startHour: "10:00 a.m.",
  //     endHour: "1:00 p.m.",
  //     tutor: { id: "Zt5_isRtMR10", name: "Victor" },
  //     location: "Victor's Zoom link",
  //     isActive: false,
  //   },
  //   {
  //     id: "kTMSq6018123",
  //     day: "Tuesday",
  //     startHour: "11:00 a.m.",
  //     endHour: "3:00 p.m.",
  //     tutor: { id: "nWZPAX1TCdfg", name: "Alin" },
  //     location: "Alin's Zoom link",
  //     isActive: false,
  //   },
  //   {
  //     id: "kTMSq6011234",
  //     day: "Friday",
  //     startHour: "1:00 p.m.",
  //     endHour: "6:00 p.m.",
  //     tutor: { id: "2ZXHi4q7J_9m", name: "Andrew" },
  //     location: "Andrew's Zoom link",
  //     isActive: false,
  //   },
  //   {
  //     id: "1234q6018qGj",
  //     day: "Saturday",
  //     startHour: "10:00 a.m.",
  //     endHour: "3:00 p.m.",
  //     tutor: { id: "Zt5_isRtMR10", name: "Victor" },
  //     location: "Victor's Zoom link",
  //     isActive: false,
  //   },
  // ];

  const [newItemId, setNewItemId] = useState(null);

  const [schedules, setSchedules] = useState([]);

  const header = ["Day", "From", "To", "Tutor", "Zoom Link"];
  const adminHeader = [...header, "Actions"];

  const handleAddSchedule = () => {
    if (!newItemId) {
      setNewItemId(() => Id.makeId());
    }
  };

  const fetchSchedules = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/schedules",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (newItemId) {
      const template = {
        id: null,
        semesterId: loadedSemester.id,
        day: "",
        startHour: "",
        endHour: "",
        tutor: { id: null, name: "" },
        location: "",
        isActive: false,
      };
      setSchedules([{ ...template, id: newItemId }, ...schedules]);
    }
  }, [newItemId])

  useEffect(() => {
    if (loadedSemester?.id) {
      fetchSchedules();
      console.log("[Fetching schedules]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    if (data) {
      setSchedules([...data]);
    }
  }, [data]);

  return (
    <MainContainer>
      {!loading && !error && (
        <TitleBar
          title="Tutor Schedule"
          icon={<PlusIcon onClick={handleAddSchedule} />}
        />
      )}

      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && schedules && schedules.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !error && schedules && schedules.length !== 0 && (
        <>
          <Table className="text-center" bordered hover responsive>
            <TableHeader headers={admin ? adminHeader : header} />
            <tbody className="text-muted">
              <ScheduleRows
                newItemId={newItemId}
                setNewItemId={setNewItemId}
                schedules={schedules}
                setSchedules={setSchedules}
                admin={admin}
              />
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
    </MainContainer>
  );
};

export default Schedules;
