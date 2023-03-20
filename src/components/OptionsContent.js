import OptionsContentInteractions from "./OptionsContentInteractions";
import OptionsContentApi from "./OptionsContentApi";
import OptionsContentSync from "./OptionsContentSync";
import OptionsContentGmail from "./OptionsContentGmail";

const OptionsContent = ({ selectedSetting }) => {
  switch (selectedSetting) {
    case "interactions":
      return <OptionsContentInteractions />;
    case "api":
      return <OptionsContentApi />;
    case "sync":
      return <OptionsContentSync />;
    case "gmail":
      return <OptionsContentGmail />;
    default:
      return <OptionsContentInteractions />;
  }
};

export default OptionsContent;
