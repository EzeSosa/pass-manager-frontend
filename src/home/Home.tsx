import './Home.css'
import { Password } from '../passwords/Password.tsx'
import { Password as PasswordType } from '../passwords/Password.ts'
import { useEffect, useState } from 'react'
import client from '../lib/api/ApiClient.ts'

function Home() {
    const [passwords, setPasswords] = useState<PasswordType[]>([])
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(1)

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const loadPasswords = async () => {
            const result = await client.get(
                `/api/v1/users/${userId}/passwords`, 
                { params: {pageNumber: pageNumber, pageSize: 5} } 
            )
            setPasswords(result.data.content)
            setTotalPages(result.data.totalPages)
        }
        loadPasswords()
    }, [userId, passwords, pageNumber])

    const handleUpdate = (id: string, name: string) => {
        console.log(`Hello ${id} ${name}`)
    }

    const handleDelete = async (id: string) => {
        await client.delete(`/api/v1/passwords/${id}`)
        setPasswords(passwords.filter(password => password.id != id))
    }

    const handleNextPage = () => {
        if (pageNumber < totalPages - 1) {
            setPageNumber(pageNumber + 1)
        }
    }

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
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
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-buttons">
                <button className='btn mx-2 btn-page' onClick={handlePreviousPage} disabled={pageNumber === 0}>{'<<'}</button>
                <button className='btn mx-2 btn-page' onClick={handleNextPage} disabled={pageNumber >= totalPages - 1}>{'>>'}</button>
            </div>
        </div>
    )
}

export default Home