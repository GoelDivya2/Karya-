import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const chunkText = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitText(text);

  return chunks;
};

export default chunkText;