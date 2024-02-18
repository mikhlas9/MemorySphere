
import React, { useState } from 'react';
import {
    Box,
    Container,
    useToast,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea
} from "@chakra-ui/react";
import axios from 'axios';

export const AddQuestion = () => {
    const [loading, setLoading] = useState(false);
    const [addQuestion, setAddQuestion] = useState({
        category: "",
        question: "",
        options: ["", "", "", ""],
        answer: ""
    });

    const toast = useToast();

    const submitHandler = async () => {
        setLoading(true);
        if (!addQuestion.category || !addQuestion.question || !addQuestion.answer ) {
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
            
                        await axios.post(
                            "https://memorysphere.onrender.com/addQuestions",
                            {
                                category: addQuestion.category,
                                question: addQuestion.question,
                                options: addQuestion.options,
                                answer: addQuestion.answer
                            },
                            config
                        );
            
                        toast({
                            title: "Question Added Successfully",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                        });
                        setAddQuestion({
                            category: "",
                            question: "",
                            options: ["", "", "", ""],
                            answer: ""
                        });
                        setLoading(false);
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
    

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "options") {
            const updatedOptions = [...addQuestion.options];
            updatedOptions[index] = value;
            setAddQuestion({ ...addQuestion, options: updatedOptions });
        } else {
            setAddQuestion({ ...addQuestion, [name]: value });
        }
    };

    return (
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
                    <Box
                        display={{ base: "flex", md: "flex" }}
                        justifyContent="center"
                        flexDir="column"
                        p={50}
                        margin="5px"
                        bg="white"
                        w={{ base: "70%", md: "70%" }}
                        borderRadius="lg"
                        borderWidth="1px"
                    >
                <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Input
                        type="text"
                        name="category"
                        value={addQuestion.category}
                        onChange={handleInputChange}
                        placeholder='Enter Category'
                    />
                    <FormLabel>Question</FormLabel>
                    <Textarea
                        size="md"
                        type="text"
                        name="question"
                        value={addQuestion.question}
                        onChange={handleInputChange}
                        placeholder='Enter Question'
                    />
                    {addQuestion.options.map((option, index) => (
                        <div key={index}>
                            <FormLabel>{`Option ${index + 1}`}</FormLabel>
                            <Input
                                type="text"
                                name="options"
                                value={option}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder={`Enter Option ${index + 1}`}
                            />
                        </div>
                    ))}
                    <FormLabel>Answer</FormLabel>
                    <Input
                        type="text"
                        name="answer"
                        value={addQuestion.answer}
                        onChange={handleInputChange}
                        placeholder='Enter Answer'
                    />
                    <Button
                        colorScheme="teal"
                        mt="4"
                        onClick={submitHandler}
                        isLoading={loading}
                    >
                        Add Question
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};

