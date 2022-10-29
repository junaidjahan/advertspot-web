import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { BaseButton } from '~/components/base';

export const BaseMenu = ({ menuItems, icon, buttonText, anchorPosition = 'left' }) => {
  const style = {
    container: { display: 'flex', alignItems: 'center', textAlign: 'center' },
    menuIcon: { mr: 1 },
    menuButton: {
      fontWeight: 'bold',
      px: 1.5,
      '&:hover': { color: 'primary.main' }
    },
    menuItem: { fontWeight: 'bold', fontSize: '13px', pr: 10 },
    paper: {
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 0px 8px rgba(49, 49, 49, 0.2))',
        mt: 0.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          [anchorPosition]: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0
        }
      }
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={style.container}>
        {icon ? (
          <IconButton
            onClick={handleClick}
            size='small'
            color='black'
            sx={{ ml: 0.5 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Icon color='black' fontSize='medium'>
              {icon}
            </Icon>
          </IconButton>
        ) : (
          <BaseButton
            onClick={handleClick}
            size='small'
            color='black'
            sx={style.menuButton}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {buttonText}
          </BaseButton>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={style.paper}
        transformOrigin={{ horizontal: anchorPosition, vertical: 'top' }}
        anchorOrigin={{ horizontal: anchorPosition, vertical: 'bottom' }}
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              onClick={() => {
                item.method();
              }}
              sx={style.menuItem}
              key={index}
            >
              {item.icon && <Icon sx={style.menuIcon}>{item.icon}</Icon>}
              {item.text}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
