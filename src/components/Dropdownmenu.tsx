import React, { useState } from 'react';

interface Props {
    options: string[],
    label: string,
    id: string,
    dispatch: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    defaultValue: string,
}

function Dropdownmenu({ options, label, defaultValue, dispatch, id }: Props) {
    const [menuValue, setMenuValue] = useState(defaultValue);

    // handle passed dispatch
    const handleOnChangeMenu = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMenuValue(event.target.value);
        dispatch(event);
    };

    return (
        <div className='flex flex-col'>
            <label className='text-xs' htmlFor={id}>{label}</label>
            <select
                id={id}
                className='text-sm font-bold rounded border-2 px-3 py-0.5 border-gray-200 text-gray-600 bg-gray-100 hover:border-indigo-400 focus:outline-none'
                value={menuValue}
                onChange={handleOnChangeMenu}
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdownmenu;