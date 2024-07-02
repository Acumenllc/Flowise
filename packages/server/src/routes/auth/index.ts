import express from 'express'
import authController from '../../controllers/auth'

const router = express.Router()

// CREATE
router.post('/login', authController.authlogin)

// READ
router.get('/verify', authController.authverify)

export default router
