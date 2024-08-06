import React, {memo} from "react";
// import {Button} from "./Button";
import {TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import {useAddItemForm} from "./hooks/useAddItemForm";

type PropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = memo(({addItem}: PropsType) => {

    const {title, error, handleChangeItemTitle, handleAddItemOnKey, handleAddItem} = useAddItemForm(addItem)

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

