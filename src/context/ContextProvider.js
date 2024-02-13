import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionContext = createContext();

const ContextProvider = ({ children }) => {
  const [category, setCategory] = useState();
  const [user, setUser] = useState();
  const [total, setTotal] = useState();
  const [correct, setCorrect] = useState();
  const [wrong, setWrong] = useState();
  const [questionTotal, setQuestionTotal] = useState();
  const [disable, setDisable] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
 
      const userInfo =  JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
  
      if (!userInfo) navigate("/");
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        user,
        setUser,
        category,
        setCategory,
        total,
        setTotal,
        correct,
        setCorrect,
        wrong,
        setWrong,
        questionTotal,
        setQuestionTotal,
        disable,
        setDisable,
        selectedTime,
        setSelectedTime,
        currentTime,
        setCurrentTime,
        isSwitchOn,
        setIsSwitchOn
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const QuestionState = () => {
  return useContext(QuestionContext);
};

export default ContextProvider;