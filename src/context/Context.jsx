import React, { createContext, useContext, useState } from "react";
import run from "../config/gemini";
import DOMPurify from 'dompurify';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");   
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const typeEffect = (text, speed) => {
    let index = 0;
    setResultData("");  
    const interval = setInterval(() => {
      setResultData(prev => prev + text[index-1]);
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
  };


const newChat =()=>{


setLoading(false)
setShowResult(false)

}




  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

     
    setPrevPrompts(prev => {
      if (!prev.includes(prompt)) {
        return [...prev, prompt];
      }
      return prev;
    });

    try {
      const response = await run(prompt);
      let responseArray = response.split("**");
      let newResponse = ""; 
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      const sanitizedResponse = DOMPurify.sanitize(newResponse2);  

      typeEffect(sanitizedResponse, 5); 

    } catch (error) {
      console.error("Error:", error);
      setResultData("Error fetching data");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,  
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
