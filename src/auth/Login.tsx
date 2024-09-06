import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../lib/api/ApiClient"
import { AuthResponse } from "./user/User"
import { Link } from "react-router-dom"
import './Auth.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const response = await client.post<AuthResponse>('/auth/login', { username, password })
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('userId', response.data.user.id)
        localStorage.setItem('accessToken', response.data.accessToken)

        navigate("/home")
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2 className='text-center'>¡Welcome to Password Manager!</h2>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label className='form-label-username' htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            className='form-control'
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label-password' htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            className='form-control'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn-primary'>Log In</button>
                </form>
                <div className='alert'>
                    <Link to="/signup">Don't have an account? Sign Up.</Link>
                </div>
            </div>
        </div>
    )
}

export default Login