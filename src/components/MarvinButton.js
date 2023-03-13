const MarvinButton = ({ children, textSize, width, disabled, ...rest }) => {
  textSize = textSize || "text-sm";
  width = width ? "w-full" : "";
  return (
    <button
      type="button"
      className={`${width} disabled:opacity-70 disabled:cursor-not-allowed text-white bg-gradient-to-r from-[#26d6c4] to-[#10b1d3] hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-[0_2px_10px_rgba(28,197,203,0.5)] font-medium rounded-lg ${textSize} text-center px-5 py-2.5 mx-1 my-1`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MarvinButton;
