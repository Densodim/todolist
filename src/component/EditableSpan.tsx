import {ChangeEvent, ChangeEventHandler, useState} from "react";

type PropsType = {
    value: string
    editaBlueSpan:(newTitle:string)=>void
}
export const EditableSpan = ({value,editaBlueSpan}: PropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value)

    const handlerActivatedEdit = () => {
        setEditMode(true);
    }
    const handlerDeactivateEdit = () => {
        setEditMode(false);
        editaBlueSpan(title);
    }
    const handlerChangeEdit = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (

        <>
            {editMode ?
                (<input value={title} onBlur={handlerDeactivateEdit} onChange={handlerChangeEdit} autoFocus/>)
                :
                (<span onDoubleClick={handlerActivatedEdit}>{value}</span>)
            }
        </>
    )
}