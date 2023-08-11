import TodoItem from './TodoItem'
import { useAppSelector } from '../store/index'
import { useMemo } from 'react';

function TodoRows() {
    const statusDefaultValue = useAppSelector((state) => state.todos.filterStatus); // get default value of status filter
    const importanceDefaultValue = useAppSelector((state) => state.todos.filterImportance); // get default value of importance filter
    const todos = useAppSelector((state) => state.todos.todoList); // get todo list from the store

    const filteredTodoList = useMemo(() => {
        // if both filters are set to all , return all of todos
        if (statusDefaultValue === 'All' && importanceDefaultValue === 'All') {
            return todos;
        }

        return todos.filter((item) => {
            // if status set to all , filter importance 
            const statusMatch = statusDefaultValue === "All" || item.status === statusDefaultValue;
            const importanceMatch = importanceDefaultValue === "All" || item.importance === importanceDefaultValue;

            //if both filters have specific values filter result and return combination of two filters
            return statusMatch && importanceMatch
        });
    }, [todos, statusDefaultValue, importanceDefaultValue]);

    return (
        <div className='flex flex-col w-full gap-3'>
            {filteredTodoList.length > 0 ? (
                filteredTodoList.map((todo) => (
                    <TodoItem
                        id={todo.id}
                        key={todo.id}
                        description={todo.description}
                        isCompleted={todo.isCompleted}
                        importance={todo.importance}
                        status={todo.status}
                    />
                ))
            ) : (
                <p className='font-bold'>No todos here.</p>
            )}
        </div>
    )
}

export default TodoRows