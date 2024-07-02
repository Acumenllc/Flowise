import { lazy } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

// project imports
import Loadable from '@/ui-component/loading/Loadable'

const Auth = Loadable(lazy(() => import('../views/auth/Login')))

// ==============================|| AUTH ROUTING ||============================== //
const AuthRoutes = {
    path: '/auth',
    element: <Auth />,
    children: []
}

export default AuthRoutes
