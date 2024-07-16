import React, {ChangeEvent, useState} from "react";
// import {Button} from "./Button";
import Button from '@mui/material/Button'
import {TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

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
                {/*<Button variant="contained" title={'+'}*/}
                {/*    // disabled={isAddItemButtonDisabled}*/}
                {/*        onClick={() => {handleAddItem()}}*/}
                {/*>+</Button>*/}
                {userItemTitleLengthWarning}
            </div>
        </>
    )
}