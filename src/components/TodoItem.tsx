import { useState } from 'react';
import { useAppDispatch } from '../store';
import { Importance, Status, Todo } from '../types/index'
import { deleteTodo, updateTodo } from '../store/todos';
import TodoModal from './TodoModal';
import Dropdownmenu from './Dropdownmenu';
import { BsTrash, BsPencil } from 'react-icons/bs'

function TodoItem(todo: Todo) {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    // Dispatch action to delete matching id of the todo
    const handleDelete = (): void => {
        dispatch(deleteTodo({ id: todo.id }));
    };

    // Dispatch action to update status and isCompleted state of todo
    const handleIsComplete = () => {
        const updatedIsComplete = !todo.isCompleted;

        dispatch(
            updateTodo({
                ...todo,
                id: todo.id,
                isCompleted: updatedIsComplete,
                status: updatedIsComplete ? "Completed" : "Incomplete"
            })
        );
    };

    // Dispatch action to update status and isCompleted state of todo
    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            updateTodo({
                ...todo,
                id: todo.id,
                isCompleted: todo.status == "Completed",
                status: event.target.value as Status,
            })
        );
    };

    // Dispatch action to update importance state of todo
    const handleImportance = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            updateTodo({
                ...todo,
                id: todo.id,
                importance: event.target.value as Importance,
            })
        );
    };

    // get color of status 
    function getStatusColor(status: Status): string {
        if (status === "Completed") return "border border-l-emerald-500";
        if (status === "Progress") return "border-l-yellow-500";
        if (status === "Incomplete") return "border-l-gray-500";
        return "";
    }

    // get color of status 
    function getImportanceColor(importance: Importance): string {
        if (importance === "High") return "text-green-600 bg-green-100 hover:bg-green-600";
        if (importance === "Medium") return "text-amber-600 bg-amber-100 hover:bg-amber-600";
        if (importance === "Low") return "text-gray-600 bg-gray-100 hover:bg-gray-600";
        return "";
    }

    return (
        <div className={`flex gap-2 items-center text-black p-4 border border-l-4 rounded-lg shadow-md bg-white ${getStatusColor(todo.status!)}`}>
            <input
                type="checkbox"
                className='w-5 aspect-square'
                checked={todo.status == "Completed" || todo.isCompleted}
                onChange={handleIsComplete}
            />
            <div className='flex flex-col flex-1 gap-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <h1 className={`text-xl font-bold text-black ${todo.status == "Completed" ? "line-through" : ""}`}>
                            {todo.description}
                        </h1>

                        <h3 className={`text-xs flex items-center justify-center px-2 py-0.5 rounded-md
                        hover:text-white ${getImportanceColor(todo.importance!)}`}>
                            {todo.importance}
                        </h3>
                    </div>
                    <div className='flex items-center gap-1'>
                        <Dropdownmenu
                            label="Status"
                            id={todo.id + "status"}
                            defaultValue={todo.status as string}
                            options={["Completed", "Progress", "Incomplete"]}
                            dispatch={(event) => handleStatus(event)}
                        />

                        <Dropdownmenu
                            label="Importance"
                            id={todo.id + "importnace"}
                            defaultValue={todo.importance as string}
                            options={["High", "Medium", "Low"]}
                            dispatch={(event) => handleImportance(event)}
                        />

                        <BsTrash
                            onClick={() => handleDelete()}
                            className='w-6 h-5 text-red-500 translate-y-2 cursor-pointer hover:scale-105'
                        />

                        <BsPencil
                            onClick={() => setShowModal(true)}
                            className='w-6 h-5 translate-y-2 cursor-pointer text-amber-500 hover:scale-105'
                        />
                    </div>
                </div>
            </div>
            {
                showModal &&
                <TodoModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    type='update'
                    todo={{ id: todo.id, description: todo.description! }}
                />
            }
        </div>
    )
}

export default TodoItem