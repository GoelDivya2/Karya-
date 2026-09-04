import "dotenv/config";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});
const generateAnswer = async (context, question) => {
  const prompt = `
You are an AI assistant for Karya, a collaborative learning workspace.

Answer the user's question using only the information provided in the context.

If the answer cannot be found in the context, say:
"I couldn't find the answer in the provided documents."

Context:
${context}

Question:
${question}
`;

  const response = await model.invoke(prompt);

  return response.content;
};












export default generateAnswer;