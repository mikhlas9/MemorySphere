import React, { useEffect } from 'react'
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from 'react-router-dom';
import { QuestionState } from '../context/ContextProvider';
import ProfileModal from './ProfileModal';
import logo from "./logo.png";


export const Navbar = () => {

    const {
        user, setUser
    } = QuestionState();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        setUser()
        navigate("/");
    };

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     setUser(userInfo)
    // }, [])
    return (
        <div>
            {/* navbar */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="99%"
                h="68px"
                p="5px 10px 5px 0px"
                margin="1px 10px 0px 10px"
                borderWidth="5px"
                borderRadius="lg"
            // backgroundColor="yellow"
            >

                <div>
                    <img src={logo} alt="Logo" style={{ width: '250px', height: '55px', borderRadius: "5px" }} />
                </div>
                <div>

                    <Menu>
                        <MenuButton as={Button} bg="#e5e5e5ba" borderWidth="5px" height="50px" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user} >
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>

            </Box>
        </div>
    )
}
