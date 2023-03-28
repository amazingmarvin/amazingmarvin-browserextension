const MarvinButton = ({ children, className, textSize, width, disabled, ...rest }) => {
  textSize = textSize || "text-sm";
  width = width ? "w-full" : "";
  return (
    <button
      type="button"
      className={`${width} ${className} disabled:opacity-70 cursor-pointer disabled:cursor-default text-white bg-gradient-to-r from-[#26d6c4] to-[#10b1d3] hover:bg-gradient-to-br disabled:bg-gradient-to-r focus:outline-none shadow-lg shadow-[0_2px_10px_rgba(28,197,203,0.5)] font-medium rounded-lg ${textSize} text-center px-5 py-2.5`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MarvinButton;
