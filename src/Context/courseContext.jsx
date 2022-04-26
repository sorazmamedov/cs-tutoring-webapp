import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";
import useAuth from "../hooks/useAuth";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CourseDataProvider = ({ children }) => {
  const { auth, ROLES } = useAuth();
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [refetch, setRefetch] = useState(false);

  const fetchCourses = () => {
    axiosFetch({
      method: "GET",
      url: "/courses",
      requestConfig: {
        params: { semesterId: loadedSemester.id, page, limit },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id) {
      fetchCourses();
      console.log("[Fetching courses]");
    }
    // eslint-disable-next-line
  }, [loadedSemester, page, refetch]);

  useEffect(() => {
    if (total) {
      const pages = Math.ceil(total / limit);
      if (pages < pageCount) {
        page + 1 === pageCount || page === 1
          ? fetchCourses()
          : setPage((prev) => prev - 1);
      }
    }
    // eslint-disable-next-line
  }, [total]);

  useEffect(() => {
    setTotal(data?.pagination?.count);
    setPageCount(data?.pagination?.pageCount);
    setCourses(data?.courses);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        courses,
        auth,
        ROLES,
        loadedSemester,
        error,
        loading,
        darkTheme,
        page,
        limit,
        pageCount,
        total,
      }}
    >
      <ActionsContext.Provider
        value={{
          setCourses,
          setRefetch,
          setPage,
          setPageCount,
          setTotal,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default CourseDataProvider;
export { ViewContext, ActionsContext };
