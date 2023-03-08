const MarvinLabel = ({ label, removeLabelHandler }) => {
  // Label color is set as a CSS variable in order for Tailwind to generate the correct color classes
  // as using something like text-[label.color] doesn't work since Tailwind won't generate classes for those colors
  // https://tailwindcss.com/docs/content-configuration#classes-aren-t-generated
  // https://github.com/tailwindlabs/tailwindcss/discussions/7036#discussioncomment-3284437
  // https://stackoverflow.com/a/54128069

  const style = { "--labelColor": label.color };

  return (
    <span
      id={label._id}
      className={`inline-flex items-center px-2.5 py-1 mr-2 rounded-full text-xs font-medium text-white bg-[var(--labelColor)]`}
      style={style}
    >
      {label.title}
      <button
        type="button"
        className="inline-flex items-center p-0.5 ml-2 text-sm text-white bg-transparent rounded-sm hover:bg-white hover:text-slate-700"
        data-dismiss-target={label._id}
        aria-label="Remove"
        onClick={() => removeLabelHandler(label._id)}
      >
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Remove label</span>
      </button>
    </span>
  );
};

export default MarvinLabel;
