import React, { useContext, useEffect } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import { ViewContext, ActionsContext } from "../../Context/semesterContext";
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
import InfoDialog from "../common/infoDialog";
import useModal from "../../hooks/useModalStates";
import useAxios from "../../hooks/useAxios";
import { getErrors } from "../common/errorHelper";

const Semesters = () => {
  const {
    data,
    error: fetchErr,
    loading: fetchLoading,
    axiosFetch,
  } = useAxios();
  const { show, title, ModalBody, reset, setModalBody, setTitle, setShow } =
    useModal();
  const {
    semesters,
    currentSemester,
    loading,
    error,
    loadedSemester,
    darkTheme,
  } = useContext(ViewContext);
  const { setSemesters, setCurrentSemester, setLoadedSemester } =
    useContext(ActionsContext);

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
    axiosFetch({
      method: "PUT",
      url: `/semesters/${currentSemester.id}`,
      requestConfig: { data: { active: !currentSemester.active } },
    });
  };

  const handleAddSemester = () => {
    setTitle("Add New Semester");
    setModalBody(<SemesterDialog {...{ reset }} />);
    setShow(true);
  };

  const handleEditSemester = () => {
    const edit = true;
    setTitle("Edit Semester");
    setModalBody(<SemesterDialog {...{ edit, reset }} />);
    setShow(true);
  };

  useEffect(() => {
    if (semesters.length !== 0) {
      const active = semesters.find((item) => item.active === true);
      if (!active) {
        if (Object.keys(loadedSemester).length === 0) {
          setCurrentSemester({ ...semesters[0] });
          setLoadedSemester({ ...semesters[0] });
        } else if (Object.keys(currentSemester).length === 0) {
          setCurrentSemester({ ...semesters[0] });
        }
      } else {
        setCurrentSemester({ ...active });
      }
    }
    // eslint-disable-next-line
  }, [semesters]);

  useEffect(() => {
    if (Object.keys(data).length) {
      let index = semesters.findIndex((item) => item.id === currentSemester.id);
      const modified = { ...currentSemester, active: !currentSemester.active };
      setSemesters([
        ...semesters.slice(0, index),
        modified,
        ...semesters.slice(++index),
      ]);
      setCurrentSemester(modified);
      if (loadedSemester.id === modified.id) {
        setLoadedSemester({ ...modified });
      }
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (fetchErr) {
      let message = "";
      Object.entries(getErrors(fetchErr)).forEach(
        ([key, value]) => (message += value + "\n")
      );
      setModalBody(<InfoDialog {...{ message, reset }} />);
      setShow(true);
    }
    // eslint-disable-next-line
  }, [fetchErr]);

  return (
    <MainContainer>
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
        <TitleBar
          className={
            darkTheme
              ? "w-100 d-flex justify-content-between align-items-center"
              : "w-100 d-flex justify-content-between align-items-center text-muted"
          }
        >
          <div className="w-100">
            <HouseIcon />
            <span className="ms-3 fw-bolder align-text-bottom">Semester</span>

            <YearSelector
              className="ms-3 align-text-bottom rounded bg-white px-1"
              onChange={(e) => handleYearChange(e.target.value)}
              value={currentSemester?.academicYear}
              years={[...new Set(semesters.map((item) => item.academicYear))]}
            />

            <SemesterSelector
              className="ms-3 align-text-bottom rounded bg-white px-1"
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
              changing={fetchLoading}
            />
          </div>
          <ActionsDropDown
            {...{
              handleAddSemester,
              handleEditSemester,
            }}
          />
        </TitleBar>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Semesters;
