import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser } from '../services/api'; // Import loginUser function from api.js

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.access);
            localStorage.setItem('refresh', response.refresh)
            localStorage.setItem('user_Data', JSON.stringify(response.user));
            navigate('/notes'); 
        } catch (error) {
            const errorMessage = 'login  failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };
    const userData = JSON.parse(localStorage.getItem('user_Data'));
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link variant="text" onClick={handleSignUpClick}>
                                    Don’t have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
             <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </ThemeProvider>
    );
}

export default LoginPage;
