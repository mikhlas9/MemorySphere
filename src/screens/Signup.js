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

export const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);


  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();



  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    // console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "/register",
        {
          name,
          email,
          password,
        },
        config
      );
      // console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
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
  };


  return (
    <Container maxW="xl" centerContent>
      <Box
        display="Flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" >
          SignUp
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <VStack spacing="5px">
          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
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

          >
            Sign Up
          </Button>
          <Text marginTop="20px" >Already Have an Account?
            <Link style={{ color: "blue" }} to="/"> Login</Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

