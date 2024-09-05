import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";

const intialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }

    case "start": {
      return {
        ...state,
        status: "active",
      };
    }

    default:
      throw new Error("ACTION UNKNOWN");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, intialState);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}
