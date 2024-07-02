import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledButton } from '@/ui-component/button/StyledButton'

import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

// ===========================|| LOGIN ||=========================== //
const Login = () => {
    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true })
        }
    }, [token, navigate])

    const handleLogin = useGoogleLogin({
        onSuccess: (response) => {
            setUser(response)
        },
        onFailure: (response) => {
            console.error(response)
        }
    })
    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    axios
                        .post('http://localhost:3000/api/v1/auth/login', {
                            email: res.data.email,
                            name: res.data.name
                        })
                        .then((res) => {
                            localStorage.setItem('token', res.data)
                        })
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [user])

    return (
        <StyledButton
            onClick={handleLogin}
            style={{
                width: '100%',
                backgroundColor: '#4285F4',
                color: 'white',
                '&:hover': {
                    backgroundColor: '#4285F4',
                    backgroundImage: `linear-gradient(rgb(0 0 0/10%) 0 0)`
                }
            }}
        >
            Login with Google
        </StyledButton>
    )
}

export default Login
