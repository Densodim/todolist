import {SxProps} from "@mui/material";


export const filterButtonsConteinerSx:SxProps = {
    display: 'flex',
    justifyContent: 'center'
}
export const getListItemSx = (isDane:boolean):SxProps=>({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDane ? '0,5' : '1',
})

export const tolbarSx:SxProps = {
    display:'flex',
    justifyContent:'space-between'
}