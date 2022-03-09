import React, { useContext, useEffect, useState } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import {
  GlobalViewContext,
  GlobalActionsContext,
} from "../Context/dataContext";
import { ViewContext, ActionsContext } from "../Context/semesterContext";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import YearSelector from "./yearSelector";
import SemesterSelector from "./semesterSelector";
import StatusLabelWithBtn from "./statusLabelWithBtn";
import LoadBtn from "./loadBtn";
import ActionsDropDown from "./actionsDropDown";
import SemesterDialog from "./semesterDialog";
import TemplateModal from "../common/templateModal";
import { HouseIcon } from "../common/icons";
import { PlusIcon } from "../common/iconsWithTooltip";
import { semesterValidator } from "../../utils/validator";
import { putSemester } from "../../apis/cs-tutoring/semesters";
import useFetcher from "../../hooks/useMakeRequest";
import InfoDialog from "../common/infoDialog";

const Semesters = () => {
  const [axiosFetch, controller] = useFetcher();
  const [changingStatus, setChangingStatus] = useState(false);
  const { loadedSemester } = useContext(GlobalViewContext);
  const { setLoadedSemester } = useContext(GlobalActionsContext);
  const { semesters, currentSemester, loading, error } =
    useContext(ViewContext);
  const {
    setTitle,
    setSemesters,
    setModalBody,
    setShow,
    setCurrentSemester,
    setEdit,
    setMessage,
  } = useContext(ActionsContext);

  const handleYearChange = (selected) => {
    const year = parseInt(selected);
    setCurrentSemester({
      ...semesters.filter((item) => item.academicYear === year)[0],
    });
  };

  const handleSemesterChange = (e) => {
    setCurrentSemester(semesters.find((item) => item.id === e.target.value));
  };

  const handleLoad = () => {
    setLoadedSemester({ ...currentSemester });
  };

  const handleStatusChange = async () => {
    setChangingStatus(true);
    const modified = {
      ...currentSemester,
      active: !currentSemester.active,
    };

    let error = semesterValidator(modified);

    if (!error) {
      const response = await axiosFetch(putSemester(modified));

      if (response.status === 200) {
        let index = semesters.findIndex((item) => item.id === modified.id);
        setSemesters([
          ...semesters.slice(0, index),
          modified,
          ...semesters.slice(++index),
        ]);
        setCurrentSemester({ ...modified });
        if (loadedSemester.id === modified.id) {
          setLoadedSemester({ ...modified });
        }
        setChangingStatus(false);
      } else {
        if (response.name === "AbortError") {
          console.log("[fetch aborted...]");
        } else {
          let message = "";
          if (response.message === "Network Error") {
            message = "Please check your internet connection!";
          } else if (response.data.error) {
            message = response.data.error;
          }
          setMessage(message);
          setChangingStatus(false);
          setModalBody(() => InfoDialog);
          setShow(true);
        }
      }
    } else {
      console.log("Error: ", error.inner);
      setChangingStatus(false);
    }
  };

  const handleAddSemester = () => {
    setTitle("Add New Semester");
    setModalBody(() => SemesterDialog);
    setShow(true);
  };

  const handleEditSemester = () => {
    setTitle("Edit Semester");
    setEdit(true);
    setModalBody(() => SemesterDialog);
    setShow(true);
  };

  useEffect(() => {
    if (semesters.length !== 0) {
      const semester = semesters.find((item) => item.active === true);
      if (Object.keys(loadedSemester).length === 0) {
        if (semester) {
          setCurrentSemester({ ...semester });
          setLoadedSemester({ ...semester });
        } else {
          setCurrentSemester({ ...semesters[0] });
          setLoadedSemester({ ...semesters[0] });
        }
      } else if (Object.keys(currentSemester).length === 0) {
        setCurrentSemester({ ...loadedSemester });
      }
    }
  }, [semesters]);

  useEffect(() => {
    return () => {
      console.log("Aborting fetch from semesters...");
      controller && controller.abort();
    };
  });

  return (
    <MainContainer className="shadow p-3 mb-4">
      {loading && (
        <Placeholder as="p" animation="glow" className="m-auto">
          <Placeholder xs={12} />
        </Placeholder>
      )}
      {!loading && error && (
        <p className="m-auto text-center text-muted">
          Error occured! Please try reloading the page!
        </p>
      )}
      {!loading && !error && semesters.length === 0 && (
        <div className="d-flex float-right">
          <p className="m-auto text-center text-muted">
            Empty - no data available!
          </p>
          <PlusIcon text="Add New Semester" onClick={handleAddSemester} />
        </div>
      )}
      {!loading && !error && semesters && semesters.length !== 0 && (
        <TitleBar className="w-100 d-flex justify-content-between align-items-center text-muted">
          <div className="w-100">
            <HouseIcon />
            <span className="ms-3 fw-bolder align-text-bottom">Semester</span>

            <YearSelector
              className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
              onChange={(e) => handleYearChange(e.target.value)}
              value={currentSemester?.academicYear}
              years={[...new Set(semesters.map((item) => item.academicYear))]}
            />

            <SemesterSelector
              className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
              onChange={(e) => handleSemesterChange(e)}
              value={currentSemester?.id}
              semesters={semesters.filter(
                (item) => item.academicYear === currentSemester?.academicYear
              )}
            />

            <LoadBtn
              loadedSemester={loadedSemester}
              currentSemester={currentSemester}
              onClick={handleLoad}
            />

            <StatusLabelWithBtn
              currentSemester={currentSemester}
              onClick={handleStatusChange}
              changing={changingStatus}
            />
          </div>
          <ActionsDropDown
            handleAddSemester={handleAddSemester}
            handleEditSemester={handleEditSemester}
          />
        </TitleBar>
      )}
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Semesters;
