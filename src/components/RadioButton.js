const RadioButton = ({ children, value, onChange, onClick }) => {
  return (
    <label className="hover:cursor-pointer">
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
