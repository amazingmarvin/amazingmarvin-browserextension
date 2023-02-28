import OptionsMarvinButton from "./OptionsMarvinButton";

const OptionsSidebar = ({ settings, selectedSetting, setSelectedSetting }) => {
  const buttons = settings.map((setting) => {
    return (
      <OptionsMarvinButton
        key={setting.name}
        selected={setting.name === selectedSetting}
        text={setting.text}
        handleClick={() => {
          setSelectedSetting(setting.name);
        }}
      />
    );
  });

  return <div className="col-span-1 flex flex-col gap-1">{buttons}</div>;
};

export default OptionsSidebar;
