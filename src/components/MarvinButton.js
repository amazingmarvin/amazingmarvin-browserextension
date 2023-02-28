const MarvinButton = ({ children, handleClick }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white bg-gradient-to-r from-[#26d6c4] to-[#10b1d3] hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-[0_2px_10px_rgba(28,197,203,0.5)] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {children}
    </button>
  );
};

export default MarvinButton;
