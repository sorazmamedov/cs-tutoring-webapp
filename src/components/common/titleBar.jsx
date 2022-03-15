import { useContext } from "react";
import { GlobalViewContext } from "../Context/dataContext";

const TitleBar = ({ className, title, icon, children, ...props }) => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const defaults = "w-100 d-flex justify-content-between text-muted mb-4";
  return (
    <div className={className || defaults} {...props}>
      {title && (
        <p className="d-inline m-0">
          {loadedSemester?.id &&
            `${loadedSemester.semesterName} ${loadedSemester.academicYear} - `}
          {title}
        </p>
      )}
      {icon}
      {children}
    </div>
  );
};

export default TitleBar;
