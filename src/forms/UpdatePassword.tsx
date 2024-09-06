import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../lib/api/ApiClient'
import './Form.css'

function UpdatePassword () {
    const [password, setPassword] = useState({ name: '' })
    const { name } = password
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const loadPassword = async () => {
            const result = await client.get(`/api/v1/passwords/${id}`)
            setPassword(result.data)
        }
        loadPassword()
    }, [id])

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, name: event.target.value })
    }

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault()
        await client.patch(`/api/v1/passwords/${id}`, { name })
        navigate('/')
    }

    return (
        <div className='form-container'>
            <div className='form-box'>
                <div className='border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Update Password</h2>

                    <form onSubmit={handleUpdate}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>New name:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the password name'
                                name='name'
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type='submit' className='form-btn-submit'>Update</button>
                        <button type='submit' className='form-btn-cancel' onClick={() => navigate("/")}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword