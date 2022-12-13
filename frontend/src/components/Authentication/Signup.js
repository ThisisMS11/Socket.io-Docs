import React, { useState, useContext } from 'react'
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
// import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/Users/userContext';
import Navbar from '../Navbar';

const ModeToggle = () => {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);



    // necessary for server-side rendering
    // because mode is undefined on the server
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="outlined"
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
        >
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
        </Button>
    );
};

export default function Signup() {

    const [newuserinfo, setNewuserinfo] = useState({ username: "", email: "", password: "", confirmpassword: "", displayname: "" });

    const handleOnChange = (e) => {
        setNewuserinfo({ ...newuserinfo, [e.target.name]: e.target.value })
    }

    const context = useContext(userContext)
    // HandleSignup is the function calling our fetch api that registers the new user.
    let { HandleSignup } = context;


    const navigate = useNavigate();

    const handlenavigate = () => {
        console.log(newuserinfo)

        if (HandleSignup(newuserinfo)) {
            navigate('/');
        }
    }

    return (
        <>
            <Navbar dissavedocument='none' disaddblog='none' disavatar='none' />
            <CssVarsProvider>
                <main className=' border-red-600 py-16'>
                    {/* <ModeToggle /> */}
                    <Sheet
                        sx={{
                            maxWidth: 400,
                            mx: 'auto', // margin left & right
                            my: 4, // margin top & botom
                            py: 3, // padding top & bottom
                            px: 2, // padding left & right
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: 'sm',
                            boxShadow: 'md',
                        }}
                        variant="outlined"
                    >
                        <div>
                            <Typography level="h4" component="h1" className='text-center'>
                                <b>Sign Up</b>
                            </Typography>
                        </div>

                        <TextField
                            // html input attribute
                            name="username"
                            type="text"
                            variant="outlined"
                            placeholder="Enter Your Username"
                            // pass down to FormLabel as children
                            label="Username"
                            value={newuserinfo.username}

                            onChange={handleOnChange}
                        />

                        <TextField
                            // html input attribute
                            name="displayname"
                            type="text"
                            variant="outlined"
                            placeholder="Ex :- Rocky123"
                            // pass down to FormLabel as children
                            label="Display Name"
                            value={newuserinfo.displayname}

                            onChange={handleOnChange}
                        />

                        <TextField
                            // html input attribute
                            name="email"
                            type="email"
                            variant="outlined"
                            placeholder="johndoe@email.com"
                            // pass down to FormLabel as children
                            label="Email"
                            value={newuserinfo.email}

                            onChange={handleOnChange}
                        />

                        <TextField
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            label="Password"
                            value={newuserinfo.password}
                            onChange={handleOnChange}
                        />

                        <TextField
                            name="confirmpassword"
                            type="password"
                            placeholder="Confirm password"
                            label="Confirm Password"
                            value={newuserinfo.confirmpassword}
                            onChange={handleOnChange}
                        />
                        <Button
                            sx={{
                                mt: 1, // margin top
                            }}
                            onClick={handlenavigate}>
                            Sign Up
                        </Button>
                        <Typography
                            endDecorator={<Link href="/login">login in</Link>}
                            fontSize="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Already have an account?
                        </Typography>
                    </Sheet>
                </main>
            </CssVarsProvider>
        </>
    );
}
