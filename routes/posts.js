import express from "express";
import db from "../db.js";
import { authorize } from "../middleware/auth.js";
import { paginationSortingMiddleware } from "../middleware/paginationSortingMiddleware.js";

const router = express.Router();

router.get(
  "/",
  [authorize("read"), paginationSortingMiddleware(async () => db.data.posts)],
  (req, res) => {
    if (res.paginatedSortedResults) {
      res.json(res.paginatedSortedResults);
      return;
    }

    // Get all posts

    res.json(db.data.posts);
  }
);

router.get("/:postsID", authorize("read"), (req, res) => {
  // Get a posts by ID

  const postsID = Number(req.params.postsID);

  const post = db.data.posts.find((p) => p.id === postsID);

  if (!post) {
    res.status(404).json({ message: "post not found" });
    return;
  }

  res.json(post);
});

router.post("/", authorize("write"), async (req, res) => {
  // Add a new posts

  const { title, content, author_id, category_id } = req.body;

  if (!title || !content || !author_id || !category_id) {
    res.status(400).json({
      message:
        "Missing required fields : title, content, author_id,category_id",
    });
    return;
  }
  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();
  const lastID = db.data.posts.reduce(
    (last, post) => Math.max(last, post.id),
    0
  );

  const newPost = {
    id: lastID + 1,
    title,
    content,
    author_id,
    category_id,
    created_at,
    updated_at,
  };

  db.data.posts.push(newPost);
  await db.write();

  res.status(201).json(newPost);
});

router.put("/:postsID", authorize("write"), async (req, res) => {
  // Update a posts by ID
  const postsID = Number(req.params.postsID);

  const post = db.data.posts.find((p) => p.id === postsID);

  if (!post) {
    res.status(404).json({ message: "post not found" });
    return;
  }

  const { title, content, author_id, category_id } = req.body;

  if (!title || !content || !author_id || !category_id) {
    res.status(400).json({
      message:
        "Missing required fields: title, content, author_id,category_id,updated_at",
    });
    return;
  }
  const updated_at = new Date().toISOString();

  post.title = title;
  post.content = content;
  post.author_id = author_id;
  post.category_id = category_id;
  post.updated_at = updated_at;

  await db.write();

  res.json(post);
});

router.delete("/:postsID", authorize("delete"), async (req, res) => {
  // Delete a posts by ID
  const postsID = Number(req.params.postsID);

  const index = db.data.posts.findIndex((p) => p.id === postsID);

  if (index === -1) {
    res.status(404).json({ message: "post not found" });
    return;
  }

  db.data.posts.splice(index, 1);
  await db.write();

  res.status(204).end();
});

export const postsRouter = router;
