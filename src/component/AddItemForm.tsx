import React, {ChangeEvent, memo, useCallback, useState} from "react";
// import {Button} from "./Button";
import {TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import {useDispatch} from "react-redux";

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(({addItem}: PropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();

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

    return (
        <>
            <div>
                <TextField
                    label="Enter a title"
                    variant={'outlined'}
                    error={!!error}
                    helperText={error}
                    value={title}
                    size={'small'}
                    onChange={handleChangeItemTitle}
                    onKeyDown={handleAddItemOnKey}
                />
                <IconButton
                    onClick={() => {
                        handleAddItem()
                    }}
                    color={'primary'}
                >
                    <AddBoxIcon/>
                </IconButton>
            </div>
        </>
    )
});

