import './Home.css'
import { Password } from '../passwords/Password.tsx'
import { Password as PasswordType } from '../passwords/Password.ts'
import { useEffect, useState } from 'react'
import client from '../lib/api/ApiClient.ts'

function Home() {
    const [passwords, setPasswords] = useState([])
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const loadPasswords = async () => {
            const result = await client.get(`/api/v1/users/${userId}/passwords`)
            setPasswords(result.data.content)
        }
        loadPasswords()
    }, [userId])

    const handleRemove = (id: number) => {
        console.log(`Hello ${id}`)
    }

    const handleUpdate = (id: number, name: string) => {
        console.log(`Hello ${id} ${name}`)
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
                        {passwords.map((password: PasswordType) => (
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