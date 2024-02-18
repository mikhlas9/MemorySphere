import React, { useEffect, useState } from 'react'
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import { QuestionState } from '../context/ContextProvider';
import axios from 'axios';
import { LuBookmarkPlus } from "react-icons/lu";
import { Icon } from '@chakra-ui/react'
import { Tooltip } from "@chakra-ui/tooltip";

export const RightBox = () => {
    const { category,
        user,
        setTotal,
        setCorrect,
        setWrong,
        setQuestionTotal,
        disable,
        setDisable,
        setCurrentTime,
        selectedTime,
        isSwitchOn,
    } = QuestionState();
    const [startAgain, setStartAgain] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState("")
    const [answerColor, setAnswerColor] = useState(['', '', '', '']);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [displayCorrect, setDisplayCorrect] = useState(false)

    const toast = useToast();


    const handleBookmark = async () => {

        const id = questions.allQuestions[currentQuestionIndex]._id;

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post("https://memorysphere.onrender.com/bookmarkedQuestions", { id }, config);

            toast({
                title: "Successful Added",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }




    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswerColor(['', '', '', '']);
        setDisplayCorrect(false)
        setDisable(false)
        setCurrentTime(selectedTime); // Update currentTime with selectedTime
        setStartAgain(true);
    };



    const checkAnswer = async (selectedOption, index) => {
        setDisable(true)

        const updatedColors = [...answerColor];

        if (selectedOption == answer) {
            updatedColors[index] = "correct";
            setAnswerColor(updatedColors);

            const id = questions.allQuestions[currentQuestionIndex]._id;

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.post("https://memorysphere.onrender.com/correct", { id }, config);
            } catch (error) {
                toast({
                    title: "Error",
                    description: " error fetching the correct answer",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }

        } else {
            updatedColors[index] = "wrong";
            setAnswerColor(updatedColors);
            setDisplayCorrect(true)

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.post("https://memorysphere.onrender.com/wrong", {}, config);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "error fetching the correct answer",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }

        }
    }



    const accessquestion = async () => {
        if (category) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.post("https://memorysphere.onrender.com/questions", { category }, config);
                await setQuestions(data)
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    }


    useEffect(() => {
        let intervalId;
        if (isSwitchOn && selectedTime) {
            setStartAgain(false)
            setCurrentTime(selectedTime);
            intervalId = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime === 0) {
                        setDisable(true); // Disable when currentTime reaches 0
                        clearInterval(intervalId); // Stop the interval
                    }
                    return prevTime > 0 ? prevTime - 1 : prevTime;
                });
            }, 1000);
        }
        return () => {

            clearInterval(intervalId);

        };

    }, [isSwitchOn, selectedTime, startAgain]);


    const fetchInfo = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                "https://memorysphere.onrender.com/info",
                config
            );
            setTotal(data.userInfo.total);
            setCorrect(data.userInfo.correct);
            setWrong(data.userInfo.wrong);
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
    }, [handleNextQuestion])


    useEffect(() => {
        setCurrentQuestionIndex(0)
        setAnswerColor(['', '', '', '']);
        setDisable(false)
        accessquestion();
    }, [category])


    useEffect(() => {
        if (questions.allQuestions && questions.allQuestions.length > 0) {
            setCurrentQuestion(questions.allQuestions[currentQuestionIndex]);
            setAnswer(questions.allQuestions[currentQuestionIndex].answer)
            setQuestionTotal(questions.allQuestions.length)
        }
    }, [questions, handleNextQuestion]);

    return (

        <Box
            display={{ base: "flex", md: "flex" }}
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "74%" }}
            borderRadius="lg"
            borderWidth="1px"
        >

            {category && questions && currentQuestion ? (
                <>

                    {/* question box */}
                    <Box className="box"
                        display={{ base: "flex", md: "flex" }}
                        flexDir="column"
                        alignItems="center"
                        p={3}
                        w={{ base: "100%", md: "95%" }}
                        height={currentQuestion.question.length < 150 ? "15vh" : "20vh"}
                        margin="20px 10px 40px 20px"
                    >
                        <Text style={{wordWrap:"break-word", whiteSpace:"pre-wrap"}} fontSize="20px">{currentQuestion.question}</Text>

                    </Box>

                    {/* option 1 */}
                    <Box className={`box choose ${answerColor[0]}`}
                        onClick={() => checkAnswer(currentQuestion.options[0], 0)}
                        display={{ base: "flex", md: "flex" }}
                        flexDir="column"
                        p={1}
                        w={{ base: "100%", md: "95%" }}
                        height="8vh"
                        margin="10px 10px 10px 20px"
                        cursor="pointer"
                    >
                        <Button height='8vh' isDisabled={disable}>

                            <Text fontSize="20px">{currentQuestion.options[0]}</Text>
                        </Button>

                    </Box>

                    {/* option 2 */}
                    <Box className={`box choose ${answerColor[1]}`}
                        onClick={() => checkAnswer(currentQuestion.options[1], 1)}
                        display={{ base: "flex", md: "flex" }}
                        flexDir="column"
                        p={1}
                        w={{ base: "100%", md: "95%" }}
                        height="8vh"
                        margin="10px 10px 10px 20px"
                        cursor="pointer"
                    >
                        <Button height='8vh' isDisabled={disable}>

                            <Text fontSize="20px">{currentQuestion.options[1]}</Text>
                        </Button>

                    </Box>
                    {/* option 3 */}
                    <Box className={`box choose ${answerColor[2]}`}
                        onClick={() => checkAnswer(currentQuestion.options[2], 2)}
                        display={{ base: "flex", md: "flex" }}
                        flexDir="column"
                        p={1}
                        w={{ base: "100%", md: "95%" }}
                        height="8vh"
                        margin="10px 10px 10px 20px"
                        cursor="pointer"
                    >
                        <Button height='8vh' isDisabled={disable}>

                            <Text fontSize="20px">{currentQuestion.options[2]}</Text>
                        </Button>

                    </Box>
                    {/* option 4 */}
                    <Box className={`box choose ${answerColor[3]}`}

                        onClick={() => checkAnswer(currentQuestion.options[3], 3)}
                        display={{ base: "flex", md: "flex" }}
                        flexDir="column"
                        p={1}
                        w={{ base: "100%", md: "95%" }}
                        height="8vh"
                        margin="10px 10px 10px 20px"
                        cursor="pointer"
                    >
                        <Button height='8vh' isDisabled={disable}>
                            <Text fontSize="20px">{currentQuestion.options[3]}</Text>

                        </Button>

                    </Box>



                    {/* display correct answer */}
                    {displayCorrect &&
                        <Text position="relative" display="flex" margin="0px 0px 0px 20px" color="green">{answer}</Text>
                    }

                    <Box display="flex"
                        justify-content="space-between"
                    >

                        {/* bookmark */}
                        <Tooltip label='Add Question to Bookmark'  placement='top' hasArrow >
                        <Box
                            display="flex"
                            margin="30px 20px 20px 55vw"
                        >
                                <Icon width="35px"
                                    height="35px"
                                    cursor="pointer"
                                    as={LuBookmarkPlus}
                                    onClick={() => handleBookmark()} />
                        </Box>
                            </Tooltip>


                        {/* next */}
                        <Button

                            onClick={() => handleNextQuestion()}
                            rightIcon={<ArrowForwardIcon />}

                            colorScheme='teal' variant='outline'
                            display="flex"
                            // marginLeft="auto"
                            width="7vw"
                            margin="30px 20px 20px 20px"
                            isDisabled={currentQuestionIndex === questions.allQuestions.length - 1}
                        > Next
                        </Button>
                    </Box>
                </>
            ) : (
                <Text fontSize="50px" textAlign="center" marginTop="30vh" >Select Category</Text>
            )}

        </Box>


    )
}
