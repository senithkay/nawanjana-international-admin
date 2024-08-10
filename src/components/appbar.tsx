import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {Menu, MenuProps} from "antd";
import {Avatar,  Tooltip} from "@mui/material";
import MenuMUI from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import {color} from "@mui/system";
import Link from "next/link";
import Image from "next/image";

const drawerWidth = 240;

type MenuItem = Required<MenuProps>['items'][number];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const items: MenuItem[] = [
    {
        key: 'grp',
        label: 'Branches',
        type: 'group',
        children: [
            { key: '13', label: 'Mallawapitiya' },
            { key: '14', label: 'Uyandana' },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub1',
        label: 'Shipment',
        icon: <MailOutlined />,
        children: [
            { key: '1', label: <Link href="/app/shipments/history">History</Link> },
            { key: '2', label: <Link href="/app/shipments/upcoming">Upcoming</Link> },
        ],
    },
    {
        key: 'sub2',
        label: <Link href="/app/reports">Reports</Link> ,
        icon: <AppstoreOutlined />,
    },
    {
        type: 'divider',
    },
    {
        key: 'sub3',
        label: <Link href="/app/items">Items</Link> ,
        icon: <AppstoreOutlined />,
    },
    {
        key: 'sub4',
        label: <Link href="/app/stocks">Stocks</Link> ,
        icon: <AppstoreOutlined />,
    },

];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({children}:{children:ReactNode}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const handleOpenUserMenu = (event:  any) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{backgroundColor: 'white', color:'black', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Nawanjana International
                    </Typography>
                    <Box sx={{ flexGrow: 0, marginLeft:'auto' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <MenuMUI
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </MenuMUI>
                    </Box>
                </Toolbar>


            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                color={'red'}
            >
                <DrawerHeader sx={{backgroundColor: '#001529'}}>
                    <div className={'w-[100px] h-[100px] mr-auto'}>
                        <Image alt={'logo'} src={'/images/logo2.png'} objectFit={'contain'} width={200} height={200} />
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{color:'#FFFFFF'}}/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>


                <Menu
                    onClick={onClick}
                    style={{width: '100%'}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                    theme={'dark'}
                />
                <div className={'flex-1 bg-[#001529]'}></div>
            </Drawer>
            <Main open={open} sx={{color:'black', marginTop: '50px', paddingTop: '50px'}}>
                {children}
            </Main>
        </Box>
    );
}
