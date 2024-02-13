import { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import {
    Box,
    Container,
    useToast,
    Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"
import { QuestionState } from "../context/ContextProvider";

export const Login = () => {
    const { user, setUser } = QuestionState();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);
    const toast = useToast();

    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate(`/${data.name}/home`);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) navigate(`/${user.name}/home`);
    }, []);


    return (
        <Container maxW="xl" centerContent>
            <Box
                display="Flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="90px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" >
                    Login
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <VStack spacing="10px">
                    <FormControl id="email" isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            value={email}
                            type="email"
                            placeholder="Enter Your Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        width="100%"
                        style={{ marginTop: 15 }}
                        onClick={submitHandler}
                        isLoading={loading}
                    >
                        Login
                    </Button>
                    <Text marginTop="20px">Don't Have an Account?
                        <Link style={{ color: "blue" }} to="/signup"> SignUp</Link>
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
};

