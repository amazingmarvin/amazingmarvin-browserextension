import OptionsContentInteractions from "./OptionsContentInteractions";
import OptionsContentApi from "./OptionsContentApi";
import OptionsContentSync from "./OptionsContentSync";

const OptionsContent = ({ selectedSetting }) => {
  switch (selectedSetting) {
    case "interactions":
      return <OptionsContentInteractions />;
    case "api":
      return <OptionsContentApi />;
    case "sync":
      return <OptionsContentSync />;
    default:
      return <OptionsContentInteractions />;
  }
};

export default OptionsContent;
