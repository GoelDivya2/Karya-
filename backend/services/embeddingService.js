import "dotenv/config";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

const generateEmbeddings = async (chunks) => {
  const vectors = await embeddings.embedDocuments(chunks);

  return vectors;
};



const generateQueryEmbedding = async (question) => {
  const vector = await embeddings.embedQuery(question);
  return vector;
};


export { generateEmbeddings, generateQueryEmbedding };