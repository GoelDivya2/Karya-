import pinecone from "../config/pinecone.js";

const index = pinecone.index("karya-index");

const storeChunks = async (chunks, embeddings, roomId, documentId) => {
  const vectors = chunks.map((chunk, i) => ({
    id: `${documentId}-chunk-${i}`,
    values: embeddings[i],
    metadata: {
      roomId: roomId.toString(),
      documentId: documentId.toString(),
      text: chunk,
    },
  }));

  console.log("Vectors length:", vectors.length);

  await index.upsert({
    records: vectors,
  });

  console.log("Vectors successfully stored in Pinecone");
};




const deleteDocumentChunks = async (documentId) => {
  await index.deleteMany({
    filter: {
      documentId: {
        $eq: documentId.toString(),
      },
    },
  });

  console.log("Document chunks deleted from Pinecone");
};



const searchChunks = async (questionEmbedding, roomId) => {
  const result = await index.query({
    vector: questionEmbedding,
    topK: 5,
    includeMetadata: true,
    filter: {
      roomId: {
        $eq: roomId.toString(),
      },
    },
  });

  return result.matches;
};



export { storeChunks, deleteDocumentChunks, searchChunks};