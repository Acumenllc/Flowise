import jwt from 'jsonwebtoken'

export const generateToken = (payload: any) => {
    return jwt.sign(payload, 'acumen', { expiresIn: '30d' })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, 'acumen')
}

export const decodeToken = (token: string) => {
    return jwt.decode(token)
}

export default {
    generateToken,
    verifyToken,
    decodeToken
}
