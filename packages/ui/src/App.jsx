import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider, CircularProgress } from '@mui/material'
import { verifyToken } from './store/actions'
import Routes from '@/routes'
import themes from '@/themes'
import NavigationScroll from '@/layout/NavigationScroll'
import { useNavigate, useLocation } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { isAuthenticated, isLoading } = useSelector(
        useMemo(
            () => (state) => ({
                isAuthenticated: state.auth.isAuthenticated,
                isLoading: state.auth.isLoading
            }),
            []
        )
    )

    const customization = useSelector((state) => state.customization)

    useEffect(() => {
        dispatch(verifyToken())
    }, [dispatch])

    if (!isAuthenticated && !isLoading && location.pathname !== '/auth') {
        navigate('/auth')
        return null
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                {!isLoading ? (
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                ) : (
                    <CircularProgress />
                )}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
