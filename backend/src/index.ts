import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.ts";
import userRoutes from "./routes/user.routes.ts";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
