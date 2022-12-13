import React, { useEffect, useContext, useCallback, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import userContext from './context/Users/userContext';
import documentContext from './context/documents/documentContext';

const Navbar = (props) => {
    let {disaddblog,dissavedocument,disavatar}=props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID')
        navigate('/login');
    }

    // Fetching the user notes here.
    const context = useContext(userContext);
    const docContext = useContext(documentContext);
    let { GetUserBlogs } = context;


    const handleMyBlogs = async () => {
        handleClose();

        navigate('/myblogscards')
    }

    // ! for opening the blogcard form via modal
    let { blogcardmodalref,check2 } = docContext;
    const handlecreatecard = () => {
        console.log(check2)
        blogcardmodalref.current.click();
    }

    const handleAllblogs=async ()=>{
        handleClose();

        await GetUserBlogs(localStorage.getItem('token'));

        navigate('/myblogs')
    }

    return (

        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='secondary'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/'>
                                BlogYou
                            </Link>
                        </Typography>

                        <Link to='/addblog'>
                            <Button color="inherit" sx={{ border: 'solid 2px white', marginX: 2 ,display:disaddblog}}>Add your blog</Button>
                        </Link>
                            <Button color="inherit" sx={{ border: 'solid 2px white', marginX: 2 ,display:dissavedocument}} onClick={handlecreatecard}>Create Card</Button>



                        <Avatar sx={{ bgcolor: 'grey', 
                        cursor: 'pointer',
                        "&:hover": { backgroundColor: "#AAA6AD" },display:disavatar }} aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >MS
                        </Avatar>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleMyBlogs}>My Blogs Cards</MenuItem>
                            <MenuItem onClick={handleAllblogs}>My All Blogs</MenuItem>
                            {localStorage.getItem('token') ? <MenuItem onClick={handlelogout}>Logout</MenuItem> : <div></div>}

                        </Menu>

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar