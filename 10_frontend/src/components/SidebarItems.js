import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';

const SidebarItems = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <ListItemButton onClick={() => navigate('/meal_register')}>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText primary="食事登録" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/meal_inquiry')}>
        <ListItemIcon>
          <RemoveRedEyeIcon />
        </ListItemIcon>
        <ListItemText primary="食事照会" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/food_register')}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="料理登録" />
      </ListItemButton>
    </>
  )
}

export default SidebarItems