import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/index";
import { updateFilterImportance, updateFilterStatus } from "./store/todos";
import Dropdownmenu from "./components/Dropdownmenu";
import TodoRows from "./components/TodoRows"
import TodoModal from "./components/TodoModal"

function App() {
  const dispatch = useAppDispatch();
  const statusDefaultValue = useAppSelector((state) => state.todos.filterStatus);
  const importanceDefaultValue = useAppSelector((state) => state.todos.filterImportance);

  const [showModal, setShowModal] = useState(false);


  return (
    <div className='flex flex-col max-w-2xl gap-4 p-4 mx-auto mt-10'>
      <h1 className='mx-auto text-2xl font-bold'>To Do App</h1>
      <div className='flex justify-between'>
        <button
          className='px-6 py-1 font-bold text-white bg-indigo-500 rounded-md w-fit hover:bg-indigo-600'
          onClick={() => setShowModal(true)}
        >
          ADD Todo
        </button>
        <div className="flex gap-2">
          <Dropdownmenu
            label="Status"
            id="filterStatus"
            defaultValue={statusDefaultValue}
            options={["All", "Completed", "Progress", "Incomplete"]}
            dispatch={(event) => dispatch(updateFilterStatus({ status: event.target.value }))}
          />
          <Dropdownmenu
            label="Importance"
            id="filterImportance"
            defaultValue={importanceDefaultValue}
            options={["All", "High", "Medium", "Low"]}
            dispatch={(event) => dispatch(updateFilterImportance({ importance: event.target.value }))}
          />
        </div>
      </div>
      <TodoRows />
      {
        showModal &&
        <TodoModal
          showModal={showModal}
          setShowModal={setShowModal}
          type='add'
        />
      }
    </div>
  )
}

export default App