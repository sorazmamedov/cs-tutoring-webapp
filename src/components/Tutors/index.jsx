import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
import TutorRowItem from "./tutorRows";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { GlobalViewContext } from "../Context/dataContext";
import { ActionsContext, ViewContext } from "../Context/tutorsContext";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import TemplateModal from "../common/templateModal";
import useFetcher from "../../hooks/useMakeRequest";
import { putTutor } from "../../apis/cs-tutoring/tutors";

const Tutors = () => {
  const [axiosFetch, controller] = useFetcher();
  const { admin } = useContext(GlobalViewContext);
  const { tutors, loading, error, reset } = useContext(ViewContext);
  const { setTutors, setShow, setTitle, setModalBody } =
    useContext(ActionsContext);
  const [saving, setSaving] = useState(null);

  const header = ["ID", "Name", "Email", "About"];
  const adminHeader = [...header, "Actions"];

  const handleEdit = (e) => {
    console.log("Edit Target: ", e);
  };

  const handleToggleChange = async (e) => {
    if (saving) {
      return;
    }
    const id = e.target.getAttribute("tutorid");
    setSaving(id);
    const item = tutors.find((item) => item.id === id);
    const modified = { ...item, isActive: !item.isActive };
    const result = await axiosFetch(putTutor(modified));

    if (result.status === 200) {
      let index = tutors.findIndex((item) => item.id === id);
      setSaving(null);
      setTutors([
        ...tutors.slice(0, index),
        result.data,
        ...tutors.slice(++index),
      ]);
    } else {
      const errorData = {};
      if (result.message === "Network Error") {
        errorData.networkError = "Please check your internet connection!";
      }

      setSaving(null);
      setTitle(result.message ? result.message : "Error Occured");
      const errorBody = getErrorModalBody(errorData);
      setModalBody(() => () => errorBody);
      setShow(true);
    }
  };

  return (
    <MainContainer>
      {!loading && !error && <TitleBar title="Tutors" icon={<PlusIcon />} />}
      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && tutors && tutors.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !error && tutors && tutors.length !== 0 && (
        <>
          <Table hover responsive>
            <TableHeader headers={admin ? adminHeader : header} />
            <tbody className="text-muted">
              <TutorRowItem
                tutors={tutors}
                saving={saving}
                admin={admin}
                onEdit={handleEdit}
                onChange={handleToggleChange}
              />
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Tutors;

function getErrorModalBody(errorData) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5 text-center">
      {Object.entries(errorData).map(([key, value]) => {
        return <p key={key}>{value}</p>;
      })}
    </div>
  );
}
