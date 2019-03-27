/*jshint esversion: 6 */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import './NavBar.css';
const NavBar = () => {
    return (
        <div >
            <AppBar position = "static" >
                <Toolbar >
                    <img src ="./resources/1200px-Star_Wars_Logo.svg.png"  className = "App-logo" alt = "logo" / >
                    <Typography variant = "title" color = "inherit" className="title">
                        STAR WARS CHARACTERS
                    </Typography>
                    <Button component={Link} to="/eventdetails" className="btntreck">
                        Show Events tracking
                    </Button>
                < /Toolbar >
            </AppBar>
        < /div >
    )
}
export default NavBar;