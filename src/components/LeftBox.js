import React, { useEffect, useState } from 'react'
import { Box, Text } from "@chakra-ui/layout";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    Select,
    Switch
} from '@chakra-ui/react'
import axios from 'axios';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { QuestionState } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

export const LeftBox = () => {
    const [categories, setCategories] = useState([]);

    const toast = useToast();
    const navigate = useNavigate()

    const { user,
        setUser,
        category,
        setCategory,
        total,
        setTotal,
        correct,
        setCorrect,
        wrong,
        setWrong,
        setSelectedTime,
        currentTime,
        setCurrentTime,
        isSwitchOn,
        setIsSwitchOn } = QuestionState();


    const handleSwitchChange = () => {
        setIsSwitchOn((prev) => !prev);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(parseInt(e.target.value));
        setCurrentTime(parseInt(e.target.value));
    };


    const fetchCategory = async () => {
        try {
            const { data } = await axios.get(
                "/category",
            );
            setCategories(data.categories)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "error fetching categories",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }




    const fetchInfo = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                "/info",
                config
            );
            setTotal(data.userInfo.total);
            setCorrect(data.userInfo.correct);
            setWrong(data.userInfo.wrong);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to get user info",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }

    const handleBookmark = async () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (userInfo) navigate(`/${userInfo.name}/bookmark`);
    }


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)
        fetchInfo()
        fetchCategory()
    }, [])

    return (

        <Box
            display={{ base: "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "25%" }}
            borderRadius="lg"
            borderWidth="1px"
        >

            {/* total question  */}
            <Box className="box"
                display={{ base: "flex", md: "flex" }}
                flexDir="column"
                justifyContent="center"
                p={3}
                w={{ base: "100%", md: "95%" }}
                height="9vh"
                margin="20px 10px 10px 20px"
            >
                <Text fontSize="20px">Total Question: {total}</Text>

            </Box>

            {/* correct */}
            <Box className="box"
                display={{ base: "flex", md: "flex" }}
                flexDir="column"
                justifyContent="center"
                p={3}
                w={{ base: "100%", md: "95%" }}
                height="9vh"
                margin="10px 10px 10px 20px"
            >
                <Text fontSize="20px">Correct: {correct}</Text>

            </Box>

            {/* wrong*/}
            <Box className="box"
                display={{ base: "flex", md: "flex" }}
                flexDir="column"
                justifyContent="center"
                p={3}
                w={{ base: "100%", md: "95%" }}
                height="9vh"
                margin="10px 10px 10px 20px"
            >
                <Text fontSize="20px">Wrong: {wrong}</Text>

            </Box>

            {/* bookmarked*/}
            <Box className="box choose"
                display={{ base: "flex", md: "flex" }}
                flexDir="column"
                justifyContent="center"
                p={3}
                w={{ base: "100%", md: "95%" }}
                height="9vh"
                margin="10px 10px 10px 20px"
                cursor="pointer"
                onClick={() => handleBookmark()}
            >
                <Text fontSize="20px">Bookmarked Questions</Text>

            </Box>


            {/* time */}
            <Box className="box"
                display={{ base: "flex", md: "flex" }}
                // justifyContent="center"
                justifyContent="space-between"
                // flexDir="column"
                p={3}
                w={{ base: "100%", md: "95%" }}
                height="9vh"
                margin="10px 10px 10px 20px"
            >
                <Switch marginTop="5px" size='lg' isChecked={isSwitchOn} onChange={handleSwitchChange} />
                <Select cursor="pointer" width="150px" placeholder='Select Time' disabled={isSwitchOn} onChange={handleTimeChange}>
                    <option value='30'>30 sec</option>
                    <option value='60'>1 min</option>
                    <option value='120'>2 min</option>
                </Select>
                <Text marginTop="5px" fontSize="20px">{currentTime} sec</Text>

            </Box>

            <Menu>
                <MenuButton fontSize="20px" width="15vw" marginTop="30px" as={Button} rightIcon={<ChevronDownIcon />}>
                    {category ? category : "Category"}
                </MenuButton>
                <MenuList overflowY={"scroll"} maxHeight={"30vh"}>
                    {categories.map((category, index) => (
                        <MenuItem
                            key={index} // Assuming each category object has an 'id' property
                            onClick={(e) => setCategory(category.category)}
                        >
                            {category.category}  ({category.count})
                        </MenuItem>
                    ))}


                </MenuList>
            </Menu>

        </Box>

    )
}
