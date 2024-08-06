import React, {ChangeEvent, useState} from "react";

export const useAddItemForm = (addItem: (title: string) => void) => {
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

    return {
        title,
        error,
        handleChangeItemTitle,
        handleAddItemOnKey,
        handleAddItem
    }
}