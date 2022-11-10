/* jshint esversion: 11 */

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';

function UserAccountDetails() {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null);

    return (
        <>
            <Tooltip title='My Account' placement='top'>
                <Avatar 
                    alt='React Logo' 
                    src='logo192.png' 
                    onClick={handleClick} 
                    sx={{ fontSize: '20px', marginLeft: 'auto', bgcolor: 'black' }}
                />
            </Tooltip>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClick}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    Edit Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <LockIcon />
                    </ListItemIcon>
                    Change Password
                </MenuItem>
                <Divider />
                <MenuItem onClick={ event => { sessionStorage.clear(); navigate('/', { replace: true }); }}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default UserAccountDetails;
