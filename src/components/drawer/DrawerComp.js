import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const PAGES = ['LOGIN', 'SIGN UP', 'DARK MODE'];
const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <List>
            {PAGES.map((page, index) => {
                return (
                <ListItemButton key={index} onClick={() => setOpenDrawer(false)}>
                    <ListItemIcon >
                        <ListItemText>{page}</ListItemText>
                    </ListItemIcon>
                </ListItemButton>)
            })}
                
            </List>
        </Drawer>
        <IconButton sx={{color: "white", marginLeft: "auto"}} onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon/>
        </IconButton>
    </React.Fragment>
  )
}

export default DrawerComp