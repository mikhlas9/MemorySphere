import react, { useEffect, useState } from "react";
import {
  Routes, 
  Route
} from "react-router-dom"
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Home } from "./screens/Home";
import { AddQuestion } from "./screens/AddQuestion";
import { QuestionState } from "./context/ContextProvider";
import { BookmarkedQuestions } from "./screens/BookmarkedQuestions";


function App() {
  // const {category} = QuestionState();
  // const [routePath, setRoutePath] = useState()

  // useEffect(() => {
  //   if (category) {
  //     setRoutePath(`/:name/home/${category.toLowerCase()}`);
  //     console.log(routePath);
  //   } else {
  //     setRoutePath("/:name/home");
  //   }
  // }, [category])

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:name/home" element={<Home />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/:name/bookmark" element={<BookmarkedQuestions />} />
      </Routes>
    </div>
  );
}

export default App;
