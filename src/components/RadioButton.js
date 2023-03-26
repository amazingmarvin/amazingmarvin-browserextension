const RadioButton = ({ children, value, onChange, onClick, ...others }) => {
  return (
    <label className="hover:cursor-pointer relative" {...others}>
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
