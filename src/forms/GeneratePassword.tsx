import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../lib/api/ApiClient'
import './Form.css'

function GeneratePassword() {
    const [password, setPassword] = useState({ name: '' })
    const { name } = password
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, name: event.target.value })
    }

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault()
        await client.post(`/api/v1/passwords`, { name, userId })
        navigate('/home')
    }

    return (
        <div className='form-container'>
            <div className='form-box'>
                <div className='border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Save Password</h2>
                    <form onSubmit={handleSave}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>Name:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the password name'
                                name='name'
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type='submit' className='form-btn-submit'>Generate</button>
                        <button type='submit' className='form-btn-cancel' onClick={() => navigate("/")}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GeneratePassword