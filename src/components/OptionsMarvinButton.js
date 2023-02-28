const OptionsMarvinButton = ({ selected, text, handleClick }) => {
  const classes = selected
    ? "bg-primary text-white shadow-[0_2px_10px_rgba(28,197,203,0.5)]"
    : "text-[#262626]";

  return (
    <div
      className={`text-sm rounded-[5px] px-[17px] py-[12px] cursor-pointer ${classes}`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default OptionsMarvinButton;
