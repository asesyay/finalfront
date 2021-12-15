import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CustomerList from './CustomerList';
import TrainingsList from './TrainingsList';


function Header() 
{

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clAppear, setClAppear] = React.useState(true);
  const [tlAppear, setTlAppear] = React.useState(false);
  


  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const OpenCustomerList = () => {
    
    setClAppear(true);
    setTlAppear(false);
    setAnchorEl(null);
  };
  const OpenTrainingList = () => {
    setClAppear(false);
    
    setTlAppear(true);
    setAnchorEl(null);
  };
  const OpenGraph = () => {
    setClAppear(false);
    setTlAppear(false);
    
    setAnchorEl(null);
  }
  

  return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
        
        <AppBar position="static">
            <Toolbar>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Personal trainer
            </Typography>
            
                <div>
                <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={OpenCustomerList}>Customer List</MenuItem>
                    <MenuItem onClick={OpenTrainingList}>Trainings</MenuItem>
                    
                </Menu>
                </div>
            
            </Toolbar>
        </AppBar>
        </Box>
        {clAppear && <CustomerList/>}
        {tlAppear && <TrainingsList/>}
        
     </div>
  );
}
export default Header;