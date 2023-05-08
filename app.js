import express from "express";
import { authorsRouter } from "./routes/authors.js";
import { categoriesRouter } from "./routes/categories.js";
import { commentsRouter } from "./routes/comments.js";
import { postsRouter } from "./routes/posts.js";
import { usersRouter } from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/authors", authorsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
