const TitleBar = ({ title, children }) => {
  return (
    <div className="w-100 d-flex justify-content-between text-muted mb-4">
      {title && <p className="d-inline m-0">{title}</p>}
      {children}
    </div>
  );
};

export default TitleBar;
