const RadioButton = ({ children, value, onChange, onClick, className, ...others }) => {
  const classes = `hover:cursor-pointer relative ${className || ""}`;
  return (
    <label className={classes} {...others}>
      <input
        type="radio"
        checked={value}
        onChange={onChange}
        onClick={onClick}
        className="hidden"
      />
      <div className={value ? "text-primary" : ""}>{children}</div>
    </label>
  );
};

export default RadioButton;
