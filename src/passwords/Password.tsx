import React from 'react'
import { Password as PasswordType } from './Password'

interface Props extends PasswordType {
    onUpdate: (id: number, name: string) => void,
    onDelete: (id: number) => void
}

export const Password : React.FC<Props> = ({ id, name, password, onUpdate, onDelete }) => {
    return (
        <tr key={id}>
            <td>{name}</td>
            <td>{password}</td>
            <td>
                <button className='btn btn-update mx-2' onClick={() => {onUpdate(id, name)}}>Update</button>
                <button className='btn btn-delete mx-2' onClick={() => {onDelete(id)}}>Delete</button>
            </td>
        </tr>
    )
}