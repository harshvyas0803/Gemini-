import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBXTsuDch4Fs08GTZRNxuBgvKRbTb9sivY"; // Your API key here
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text(); // Correct usage here
    console.log("API Response:", responseText);  
    return responseText;  // Corrected return
  } catch (error) {
    console.error("API Error:", error); 
    return "Error fetching data";
  }
}

export default run;
