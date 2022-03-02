const TitleBar = ({ className, title, children, ...props }) => {
  const defaults = "w-100 d-flex justify-content-between text-muted mb-4";
  return (
    <div className={className || defaults} {...props}>
      {title && <p className="d-inline m-0">{title}</p>}
      {children}
    </div>
  );
};

export default TitleBar;
