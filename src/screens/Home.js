import * as React from "react"
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/layout";

import { Spinner } from "@chakra-ui/spinner";

import { useNavigate } from "react-router-dom";
import "../App.css"
import { Navbar } from "../components/Navbar"
import { LeftBox } from "../components/LeftBox";
import { RightBox } from "../components/RightBox";
import { QuestionState } from "../context/ContextProvider";

export const Home = () => {
    const { setUser, user } = QuestionState();
    const [isLoading, setIsLoading] = React.useState(false)

    const navigate = useNavigate();

    React.useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            setUser(userInfo)
        
    }, []);


    return (
        <>
        { user &&
        <div style={{ width: "100%" }}>

            <Navbar />
            <Box display="flex" justifyContent="space-between" w="100%" h="90vh" p="10px">
                <LeftBox />
                <RightBox />
            </Box>
        </div>
        }
        </>
    );
}

