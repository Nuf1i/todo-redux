import { Todo } from '../types/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const getTodoList = (): Todo[] => {
    // get todo list from local storage
    const localTodoList = window.localStorage.getItem('todoList');
    // if todo list is not empty parse it
    if (localTodoList) {
        return JSON.parse(localTodoList) as Todo[];
    }
    // if no todo list in local storage ,  make it empty array
    window.localStorage.setItem('todoList', [] as never);
    return [];
};

interface InitialState {
    filterStatus: string,
    filterImportance: string,
    todoList: Todo[],
}

const initialValue: InitialState = {
    filterStatus: 'All',
    filterImportance: 'All',
    todoList: getTodoList(),
};

export const TodoSlice = createSlice({
    name: 'todos',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action: PayloadAction<Pick<Todo, 'description'>>) => {
            const newTodo: Todo = {
                id: Math.floor(Math.random() * Date.now()).toString(36), // Get random id by using date or by uuid
                description: action.payload.description,
                isCompleted: false, // Set default value for isCompleted
                status: 'Incomplete', // Set default value for status
                importance: 'Low', // Set default value for importance
            };

            state.todoList.push(newTodo); // add the new todo in the todo list state
            window.localStorage.setItem('todoList', JSON.stringify(state.todoList));  // store todo list in the local storage
        },
        deleteTodo: (state, action: PayloadAction<Pick<Todo, 'id'>>) => {
            // remove todo with the matching ID , using filter
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload.id);
            // update local storage with new todo list
            window.localStorage.setItem('todoList', JSON.stringify(state.todoList));
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const { id, description, isCompleted, importance, status } = action.payload;

            // Update the todo with the matching ID
            const updatedTodoList = state.todoList.map((todo) => {
                // Update value if provided and keep the rest the same
                if (todo.id === id) {
                    return {
                        ...todo,
                        ...(description !== undefined && { description }),
                        ...(isCompleted !== undefined && { isCompleted }),
                        ...(importance !== undefined && { importance }),
                        ...(status !== undefined && { status }),
                    };
                }
                return todo;
            });

            // Update local storage
            window.localStorage.setItem('todoList', JSON.stringify(updatedTodoList));

            // Return a new state object with the updated todoList
            return {
                ...state,
                todoList: updatedTodoList,
            };
        },
        updateFilterStatus: (state, action: PayloadAction<{ status: string }>) => {
            // update filter status 
            state.filterStatus = action.payload.status;
        },
        updateFilterImportance: (state, action: PayloadAction<{ importance: string }>) => {
            // update filter importance 
            state.filterImportance = action.payload.importance;
        },
    }
});

export default TodoSlice.reducer;
export const {
    addTodo,
    deleteTodo,
    updateTodo,
    updateFilterStatus,
    updateFilterImportance } = TodoSlice.actions;