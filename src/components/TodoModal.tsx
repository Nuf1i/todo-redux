import { lazy, useEffect, useState, Suspense, useCallback } from 'react'
import { useAppDispatch } from '../store';
import { addTodo, updateTodo } from '../store/todos';

type Todo = {
    id: string,
    description: string,
}

type ModalType = "add" | "update"

interface Props {
    type: ModalType,
    todo?: Todo,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = lazy(() => import('./Modal'));

function TodoModal({ type, todo, showModal, setShowModal }: Props) {
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();

    // check if type of modal "update" , update input description otherwise type is "add"  , keep it empty
    useEffect(() => {
        if (type === 'update' && todo) {
            setDescription(todo.description);
        } else {
            setDescription('');
        }
    }, [setDescription, todo, type]);


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // stop if the input is empty
        if (description === '') {
            setError(true)
            return;
        }

        // if the modal type add , add new todo
        if (type === 'add') {
            dispatch(addTodo({ description }));
        }

        // if the modal type update , update current description
        if (type === 'update') {
            dispatch(updateTodo({
                ...todo,
                id: todo!.id,
                description,
            }));
        }

        // after add or update , close the modal
        setShowModal(false)
    }


    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        setError(e.target.value === '');
    }, []);

    return (
        <div>
            {
                showModal && (
                    <Suspense fallback={<></>}>
                        <Modal setShowModal={setShowModal}>
                            <form className='flex flex-col p-5 mt-5' onSubmit={(e) => submit(e)}>
                                <label htmlFor="description">Todo Description</label>
                                <input
                                    id="description"
                                    name='description'
                                    value={description}
                                    className="p-2 border rounded-md"
                                    placeholder='Enter Your Todo'
                                    onChange={handleInputChange}
                                />
                                {
                                    error &&
                                    <span className='text-xs font-bold text-red-600'>
                                        Required
                                    </span>
                                }

                                <div className='flex gap-2 mt-4'>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="w-4/12 px-4 py-2 text-red-600 border border-red-500 rounded-md cursor-pointer hover:text-white hover:bg-red-600"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className={`flex-1 px-4 py-2 text-white rounded-md cursor-pointer 
                                            ${type == "add"
                                                ? "bg-indigo-500  hover:bg-indigo-600 active:bg-indigo-700"
                                                : "bg-amber-500 hover:bg-amber-600 active:bg-amber-700"} `}
                                    >
                                        {type == "add" ? "Add" : "Update"}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </Suspense>
                )
            }
        </div>
    )
}

export default TodoModal;