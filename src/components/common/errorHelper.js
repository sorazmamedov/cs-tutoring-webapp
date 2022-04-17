import React from "react";

export function ErrorModalBody({ errorData }) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5 text-center">
      {Object.entries(errorData).map(([key, value]) => {
        return <p key={key}>{value}</p>;
      })}
    </div>
  );
}

export function showErrors(err, setTitle, setShow, setModalBody) {
  const errorData = getErrors(err);
  if (errorData?.badRequest) {
    setTitle("Bad Request"); //400
  } else if (errorData?.unauthorized) {
    setTitle("Unauthorized"); //401
  } else if (errorData?.forbidden) {
    setTitle("Forbidden"); //403
  } else if (errorData?.notFound) {
    setTitle("404 Error"); //404
  } else if (errorData?.fileTypeMismatch) {
    setTitle("File Type Mismatch");
  } else if (errorData?.networkError || errorData?.chunkLoadError) {
    setTitle("Network Error");
  } else if (errorData?.error) {
    setTitle("Error");
  } else if (errorData?.unknown) {
    setTitle("Unexpected Error");
  } else {
    setTitle("Validation Error");
  }

  setModalBody(<ErrorModalBody {...{ errorData }} />);
  setShow(true);
}

export function getErrors(err) {
  const errorData = {};
  // if (Object.keys(err).length) {
  if (err.inner) {
    for (let item of err.inner) {
      const name = item.path;
      const message = item.message;
      errorData[name] = message;
    }
  } else if (err?.status === 400) {
    errorData.badRequest = err.data.error;
  } else if (err?.status === 401) {
    errorData.unauthorized =
      err.data.error ??
      "You are not authenticated, sign in with Google (NEIU email only!)";
  } else if (err?.status === 403) {
    errorData.forbidden =
      err.data.error ?? "You are not authorized to perform this action!";
  } else if (err?.status === 404) {
    errorData.notFound = err.data.error;
  } else if (err?.message === "FileTypeMismatch") {
    errorData.fileTypeMismatch = "Excel (.xlsx) file is required!";
  } else if (err?.message === "Network Error") {
    errorData.networkError = "Please check your internet connection!";
  } else if (err?.name === "ChunkLoadError") {
    errorData.chunkLoadError =
      "Failed to load necessary file! Please check your internet connection!";
  } else if (err?.message) {
    errorData.error = err.message;
  } else if (err?.error) {
    errorData.error = err.error;
  } else {
    errorData.unknown = "Something went wrong, please try again!";
  }
  // }

  return errorData;
}
