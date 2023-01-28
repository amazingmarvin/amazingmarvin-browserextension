import TaskList from "./components/TaskList";
import BottomMenu from "./components/BottomMenu";

const App = () => {
  return (
    <div className="flex flex-col w-[400px] h-[400px]">
      <TaskList />
      <BottomMenu />
    </div>
  );
};

export default App;
