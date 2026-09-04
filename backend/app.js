import express from "express";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";


const app = express();
app.use(express.json());



app.use("/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/rooms", documentRoutes);
app.use("/rooms", questionRoutes);


app.get("/", (req, res) => {
    res.send("Karya backend is running");
});

export default app;