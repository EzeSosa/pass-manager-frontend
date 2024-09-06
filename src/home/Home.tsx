import './Home.css'
import { Password } from '../passwords/Password.tsx'
import { Password as PasswordType } from '../passwords/Password.ts'
import { useEffect, useState, useCallback } from 'react'
import client from '../lib/api/ApiClient.ts'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [passwords, setPasswords] = useState<PasswordType[]>([])
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')

    const loadPasswords =  useCallback(async () => {
        const result = await client.get(
            `/api/v1/users/${userId}/passwords`, 
            { params: {pageNumber: pageNumber, pageSize: 5} } 
        )
        setPasswords(result.data.content)
        setTotalPages(result.data.totalPages)
    }, [userId, pageNumber])

    useEffect(() => {
        loadPasswords()
    }, [loadPasswords])

    const handleUpdate = (id: string) => {
        navigate(`/updatepassword/${id}`)
    }

    const handleDelete = async (id: string) => {
        await client.delete(`/api/v1/passwords/${id}`)
        setPasswords(passwords.filter(password => password.id != id))
        loadPasswords()
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

    const handleLogout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
    }

    return (
        <div className='container'>
            <div className='button-container'>
                <strong className='str-username'>¡Hello, {username}!</strong>
                <button className='btn-new-password' onClick={() => navigate("/savepassword")}>Generate Password</button>
                <button className='btn-logout' onClick={handleLogout}>Logout</button>
            </div>
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