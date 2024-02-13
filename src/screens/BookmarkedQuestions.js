import React, { useState, useEffect } from 'react';
import {
    Box,
    useToast,
    Text,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { QuestionState } from '../context/ContextProvider';
import { Navbar } from '../components/Navbar';
export const BookmarkedQuestions = () => {
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
    const { user } = QuestionState()

    const toast = useToast()

    const fetchInfo = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                "https://memorysphere.onrender.com/bookmarkedQuestions",
                config
            );
            setBookmarkedQuestions(data.userBookmark.bookmarked)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.delete(
                `https://memorysphere.onrender.com/bookmarkedQuestions/${id}`,
                config
            );
            toast({
                title: "Bookmark deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            fetchInfo()
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }


    useEffect(() => {
        fetchInfo()
    }, [])
    useEffect(() => {
        fetchInfo()
    }, [handleDelete])

    return (
        <>
            {user &&
                <Box
                    display={{ base: "flex", md: "flex" }}
                    alignItems="center"
                    flexDir="column"
                    margin="5px 10px 5px 10px"
                    bg="white"
                    w={{ base: "100%", md: "100%" }}
                    height="97vh"
                    borderRadius="lg"
                    borderWidth="1px"
                    backgroundColor="rgba(106, 65, 86, 0.21)"
                >
                    <Navbar />

                    {bookmarkedQuestions.slice().reverse().map((bookmark, index) => (
                        <Box display="flex" flexDir="row" w={{ base: "99%", md: "99%" }}>
                            <Box
                                key={bookmark._id}
                                display={{ base: "flex", md: "flex" }}
                                justifyContent="center"
                                flexDir="column"
                                p="10px"
                                margin="5px"
                                bg="white"
                                w={{ base: "95%", md: "95%" }}
                                borderRadius="lg"
                                borderWidth="1px"
                            >
                                <Text >Q{index + 1}.) {bookmark.question}</Text>
                                <Text color="green">Ans.) {bookmark.answer}</Text>
                            </Box>
                            <Tooltip label='Remove Question from Bookmark' placement='left-start' hasArrow >
                                <DeleteIcon
                                    color="white"
                                    width="25px"
                                    height="25px"
                                    margin="30px 10px 0px 20px"
                                    cursor="pointer"
                                    onClick={() => handleDelete(bookmark._id)}
                                />
                            </Tooltip>
                        </Box>
                    ))}


                </Box>
            }
        </>

    );
}
