import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import SettingsIcon from '@mui/icons-material/Settings'; // Import Settings icon
import { Menu, MenuItem } from '@mui/material'; // Import Menu and MenuItem from Material-UI
import './Thank.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

function Thank() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of the menu

  useEffect(() => {
    if (isDashboardOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when dashboard is open
    } else {
      document.body.style.overflow = 'hidden'; // Allow scrolling when dashboard is closed
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'hidden'; // Reset overflow style on component unmount
    };
  }, [isDashboardOpen]);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    // Perform logout action here (e.g., clearing session, redirecting to login page)
    // For now, let's just navigate to the login page
    handleMenuClose(); // Close the menu before navigating
    // Replace '/login' with the actual path to your login page
    window.location.href = '/login';
  };

  return (
    <>
      <div className='first' style={{ position: 'relative', marginTop: '5px', marginLeft: '5px', height: '100vh', overflowY: isDashboardOpen ? 'hidden' : 'auto' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', margin: '5px', backgroundColor: '#4365CF', width: '50px', height: '50px', borderRadius: '5px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} onClick={toggleDashboard}>
          <MenuIcon style={{color:'white'}}/>
        </div>
        <div style={{ position: 'absolute', top: '5px', left: '100px', display: 'flex', alignItems: 'center' }}>
          <BloodtypeIcon style={{ color: '#4365CF', fontSize: '60px' }} />
          <p style={{ fontSize: '60px', margin: '0', paddingLeft: '15px', color: '#4365CF', fontFamily:'playfair-display-uniquifier',fontWeight:'500' }}>Unity LifeLine</p>
        </div>
        {/* Settings button */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <SettingsIcon onClick={handleMenuOpen} />
          {/* Menu for settings */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        {isDashboardOpen && (
          <div className="dashboard-container">
<nav style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
<nav style={{ paddingLeft: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center',marginBottom:'15px'}}>
      <DashboardIcon style={{ color: 'white' }} />
      <Link to='dashboards' style={{ textDecoration: 'none', color: 'white', marginLeft: '10px', fontFamily: 'playfair-display-uniquifier', fontSize: '29px' ,transition: 'font-size 0.3s' }} className="zoomable">Dashboard</Link>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center',marginBottom:'15px' }}>
      <SupervisedUserCircleIcon style={{ color: 'white' }} />
      <Link to='doctors' style={{ textDecoration: 'none', color: 'white', marginLeft: '10px', fontFamily: 'playfair-display-uniquifier', fontSize: '29px',transition: 'font-size 0.3s'  }} className="zoomable">Doctors</Link>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center',marginBottom:'15px' }}>
      <GroupAddIcon style={{ color: 'white' }} />
      <Link to='patients' style={{ textDecoration: 'none', color: 'white', marginLeft: '10px', fontFamily: 'playfair-display-uniquifier', fontSize: '29px',transition: 'font-size 0.3s'  }} className="zoomable">Patients</Link>
    </div>
  </nav>
  </nav>
          </div>
        )}
      </div>
      {/* Adjust the left margin of Outlet based on whether the dashboard is open or closed */}
      <div style={{ marginLeft: isDashboardOpen ? '300px' : '0px', marginTop: '-535px' }}> {/* Adjust margin left as needed */}
        <Outlet />
      </div>
    </>
  );
}

export default Thank;
