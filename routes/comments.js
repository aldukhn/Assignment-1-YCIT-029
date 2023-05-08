import express from "express";
import db from "../db.js";
import { authorize } from "../middleware/auth.js";
import { paginationSortingMiddleware } from "../middleware/paginationSortingMiddleware.js";

const router = express.Router();

router.get("/", authorize("read"), (req, res) => {
  // Get all comments

  res.json(db.data.comments);
});

router.get(
  "/:commentID",
  paginationSortingMiddleware(async () => db.data.comments),
  authorize("read"),
  (req, res) => {
    // Get a comments by ID

    const commentID = Number(req.params.commentID);

    const comment = db.data.comments.find((c) => c.id === commentID);

    if (!comment) {
      res.status(404).json({ message: "comment not found" });
      return;
    }

    res.json(comment);
  }
);

router.post("/", authorize("write"), async (req, res) => {
  // Add a new comments

  const { content, author_name, author_email, post_id } = req.body;

  if (!content || !author_name || !author_email || !post_id) {
    res.status(400).json({
      message:
        "Missing required fields : content, author_name, author_email, post_id",
    });
    return;
  }
  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();
  const lastID = db.data.comments.reduce(
    (last, comment) => Math.max(last, comment.id),
    0
  );

  const newComment = {
    id: lastID + 1,
    content,
    author_name,
    author_email,
    post_id,
    created_at,
    updated_at,
  };

  db.data.comments.push(newComment);
  await db.write();

  res.status(201).json(newComment);
});

router.put("/:commentID", authorize("write"), async (req, res) => {
  // Update a Comment by ID
  const commentID = Number(req.params.commentID);

  const comment = db.data.comments.find((p) => p.id === commentID);

  if (!comment) {
    res.status(404).json({ message: "comment not found" });
    return;
  }

  const { content, author_name, author_email, post_id } = req.body;

  if (!content || !author_name || !author_email) {
    res.status(400).json({
      message:
        "Missing required fields: content, author_name, author_email, post_id",
    });
    return;
  }
  const updated_at = new Date().toISOString();

  comment.content = content;
  comment.author_name = author_name;
  comment.author_email = author_email;
  comment.post_id = post_id;
  comment.updated_at = updated_at;

  await db.write();

  res.json(comment);
});

router.delete("/:commentID", authorize("delete"), async (req, res) => {
  // Delete a comment by ID
  const commentID = Number(req.params.commentID);

  const index = db.data.comments.findIndex((p) => p.id === commentID);

  if (index === -1) {
    res.status(404).json({ message: "comment not found" });
    return;
  }

  db.data.comments.splice(index, 1);
  await db.write();

  res.status(204).end();
});

export const commentsRouter = router;
