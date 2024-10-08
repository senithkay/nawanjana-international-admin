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
import {Menu, MenuProps, Select, Space} from "antd";
import {Avatar,  Tooltip} from "@mui/material";
import MenuMUI from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import {color} from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import {showHideLoading} from "@/redux/loading";
import axiosInstance from "@/utils/axiosInstance";
import {RESPONSE_STATUS} from "@/utils/enums";
import {authenticate} from "@/redux/auth";
import {useAppDispatch} from "@/redux/hooks";

const drawerWidth = 240;

type MenuItem = Required<MenuProps>['items'][number];



const items: MenuItem[] = [

    {
        key: 'grp2',
        label: <span className={'font-thin'}>Options</span>,
        type: 'group',
        children: [
            {
                key: 'sub1',
                label: <Link href="/app/dashboard">Dashboard</Link> ,
                icon: <MailOutlined />,
            },
            {
                key: 'sub2',
                label: 'Shipments',
                icon: <MailOutlined />,
                children: [
                    { key: '1', label: <Link href="/app/shipments/history">History</Link> },
                    { key: '2', label: <Link href="/app/shipments/upcoming">Upcoming</Link> },
                ],
            },
            {
                key: 'sub3',
                label: <Link href="/app/reports">Reports</Link> ,
                icon: <AppstoreOutlined />,
            },
            {
                type: 'divider',
            },
            {
                key: 'sub4',
                label: <Link href="/app/items">Items</Link> ,
                icon: <AppstoreOutlined />,
            },
            {
                key: 'sub5',
                label: <Link href="/app/stocks">Stocks</Link> ,
                icon: <AppstoreOutlined />,
            },
        ],
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
    const dispatch = useAppDispatch();


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

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const settings = [
        {
            title:"Profile",
            method: ()=>{
                handleCloseUserMenu()
                alert('profile')
            }
        },
        {
            title:"Logout",
            method: ()=>{
                handleCloseUserMenu()
                axiosInstance.get('/auth/logout')
                    .then((response)=>{
                        if (response.status === RESPONSE_STATUS.SUCCESS){
                            dispatch(authenticate({
                                isAuthenticated: false,
                                id:undefined,
                                name:undefined,
                                email:undefined,
                                image:undefined,
                            }))
                            router.push('/auth/signin');
                        }
                    })
            }
        },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{backgroundColor: 'white', color:'black', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", zIndex:'1000'}}>
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
                   <div className={'flex gap-2.5'}>
                      <div className={'hidden md:flex'}>
                          <Typography variant="h6" noWrap component="div">
                              Nawanjana International
                          </Typography>
                      </div>
                       <Space wrap>
                           <Select
                               defaultValue="1"
                               style={{ width: 120 , zIndex:'2000'}}
                               onChange={handleChange}
                               options={[
                                   { value: '1', label: 'Mallawapitiya' },
                                   { value: '2', label: 'Uyandana' },
                               ]}
                           />
                       </Space>
                   </div>
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
                                <MenuItem key={setting.title} onClick={setting.method}>
                                    <Typography textAlign="center">{setting.title}</Typography>
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

              <div className={'w-full h-[20px] bg-[#001529]'}></div>


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
