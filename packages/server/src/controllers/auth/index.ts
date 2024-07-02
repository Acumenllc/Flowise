import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { generateToken, verifyToken } from '../../services/auth'

export const authlogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, 'Error: authController.authlogin - request body not provided!')
        }
        const apiResponse = generateToken(req.body)
        res.setHeader('Authorization', apiResponse)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export const authverify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                'Error: authController.authverify - Authorization header not provided!'
            )
        }
        const apiResponse = verifyToken(token)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}
export default {
    authlogin,
    authverify
}
