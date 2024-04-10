import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import {DeleteForever, Logout} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import logo from '../../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import {IconToiletPaper} from "@tabler/icons-react";

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer'
};

function AppAppBar() {
    const handleReload = () => {
        window.location.reload();
    };

    const navigate = useNavigate();

    const navigateToLogs = () => {
        navigate('/esp/historique/'); // Redirect to the specified URL
    };
    const navigateToRec = () => {
        navigate('/esp/reclamation/'); // Redirect to the specified URL
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)'
                        })}
                    >
                        <Box
                            sx={{
                                flex: '1 1 75%', // Take half of the available space
                                display: 'flex',
                                alignItems: 'center',
                                px: 0
                            }}
                        >
                            <img
                                src={
                                    logo
                                }
                                style={logoStyle}
                                alt="ESPRIT"
                            />
                            <Box   sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: 'calc(69% - 48px)', // Adjust the width accordingly
                            }}>
                                <MenuItem
                                    onClick={navigateToRec}
                                    sx={{py: '6px', px: '12px',justifyContent: 'space-evenly'}}

                                >
                                    <Typography variant="h4" color="#C62828" sx={{ marginRight: 1 }} >
                                        <i> Espace Réclamation</i>
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" sx={{ overflow:1  }} >
                                        mahmoudss.balour@esprit.tn
                                    </Typography>
                                </MenuItem>

                                <MenuItem
                                    sx={{py: '6px', px: '12px'}}
                                >
                                    <IconButton aria-label="delete" size="large" onClick={handleReload} color="primary">
                                        <DeleteForever fontSize="inherit"/>
                                    </IconButton>
                                </MenuItem>
                            </Box>
                        </Box>
                        <Box sx={{ flex: '1 1 25%' }}>
                            <MenuItem
                                sx={{py: '6px', px: '12px'}}
                            >
                                <Button startIcon={<IconToiletPaper />} aria-label="delete" size="large" onClick={navigateToLogs} sx={{color:"#050505"}}>
                                    Historique
                                </Button>
                            </MenuItem>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                gap: 0.5,
                                alignItems: 'center'
                            }}
                        >
                            <Button size="small" color="info" sx={{bgcolor: "#535252"}}
                                    variant="contained" endIcon={<Logout/>}>Logout</Button>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}


export default AppAppBar;
