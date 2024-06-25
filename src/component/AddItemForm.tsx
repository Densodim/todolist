import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddItem = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title cannot be empty')
        }
    }

    const handleChangeItemTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const handleAddItemOnKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (event.key === 'Enter') {
            handleAddItem()
        }
    }

    const userItemTitleLengthWarning = title.length > 15 && <div>message exceeds 15 characters</div>;
    const userItemEmptyTitleError = error && <div className={'error-message'}>{error}</div>


    return (
        <>
            <div>
                <input value={title}
                       onChange={handleChangeItemTitle}
                       onKeyDown={handleAddItemOnKey}
                       className={error ? 'error' : ''}
                />
                <Button title={'+'}
                    // disabled={isAddItemButtonDisabled}
                        onClick={() => {
                            handleAddItem()
                        }}
                />
                {userItemEmptyTitleError}
                {userItemTitleLengthWarning}
            </div>
        </>
    )
}