import { Checkbox, TableCell, TableRow } from '@mui/material'
import React from 'react'

const SimpleTodoItem = () => {
    return (<TableRow className='task-header'>
        <TableCell>
            <Checkbox checked /> Todo Title
        </TableCell>
    </TableRow>)
}

export default SimpleTodoItem
