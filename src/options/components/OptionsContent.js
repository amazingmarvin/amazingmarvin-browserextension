import OptionsContentGeneral from "./OptionsContentGeneral";
import OptionsContentApi from "./OptionsContentApi";
import OptionsContentSync from "./OptionsContentSync";
import OptionsContentGmail from "./OptionsContentGmail";

const OptionsContent = ({ selectedSetting }) => {
  switch (selectedSetting) {
    case "general":
      return <OptionsContentGeneral />;
    case "api":
      return <OptionsContentApi />;
    case "sync":
      return <OptionsContentSync />;
    case "gmail":
      return <OptionsContentGmail />;
    default:
      return <OptionsContentGeneral />;
  }
};

export default OptionsContent;
