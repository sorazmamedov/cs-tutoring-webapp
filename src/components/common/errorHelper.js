export function getErrorModalBody(errorData) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5 text-center">
      {Object.entries(errorData).map(([key, value]) => {
        return <p key={key}>{value}</p>;
      })}
    </div>
  );
}

export function showErrors(err, setTitle, setShow, setModalBody) {
  const errorData = {};
  if (err.inner) {
    for (let item of err.inner) {
      const name = item.path;
      const message = item.message;
      errorData[name] = message;
    }
    setTitle("Validation Error");
  } else if (err.status === 404) {
    errorData.notFound = err.data.error;
    setTitle("404 Error");
  } else if (err.status === 400) {
    errorData.validationError = err.data.error;
    setTitle("Validation Error");
  } else if (err?.message === "Network Error") {
    errorData.networkError = "Please check your internet connection!";
    setTitle("Network Error");
  } else if (err?.message && err?.title) {
    errorData.error = err.message;
    setTitle(err.title);
  } else {
    errorData.networkError =
      "Something went wrong, please try again now or later!";
    setTitle("Unexpected Error");
  }

  setModalBody(() => () => getErrorModalBody(errorData));
  setShow(true);
}

export function getErrors(err) {
  const errorData = {};
  if (err.inner) {
    for (let item of err.inner) {
      const name = item.path;
      const message = item.message;
      errorData[name] = message;
    }
  } else if (err.status === 404) {
    errorData.notFound = err.data.error;
  } else if (err.status === 400) {
    errorData.validationError = err.data.error;
  } else if (err?.message === "Network Error") {
    errorData.networkError = "Please check your internet connection!";
  } else if (err?.message && err?.title) {
    errorData.error = err.message;
  } else {
    errorData.networkError =
      "Something went wrong, please try again now or later!";
  }

  return errorData;
}
