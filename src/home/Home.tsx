import './Home.css'
import { Password } from '../passwords/Password.tsx'
import { useState } from 'react'

function Home() {
    const [passwords, setPasswords] = useState([
        {
            id: 1,
            name: 'Twitter',
            password: 'xMK89AS=cjkas/LJka9'
        },
        {
            id: 2,
            name: 'Facebook',
            password: 'as89S=asckakas/LJka9'
        },
        {
            id: 3,
            name: 'Instagram',
            password: 'o9SZuS=cjkas/LJk12s'
        }
    ])

    const handleRemove = (id: number) => {
        const newPasswords = passwords.filter(password => password.id != id)
        setPasswords(newPasswords)
    }

    const handleUpdate = (id: number, name: string) => {
        const newPasswords = passwords.map(password => {
            if (password.id === id) {
                return {
                    ...password,
                    name: name
                }
            }
            return password
        })
        setPasswords(newPasswords)
    }

    return (
        <div className='container'>
            <div className='table-container'>
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Password</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwords.map((password) => (
                            <Password 
                                id={password.id}
                                name={password.name}
                                password={password.password}
                                onUpdate={handleUpdate}
                                onDelete={handleRemove}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home