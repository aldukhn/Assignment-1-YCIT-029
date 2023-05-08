import express from "express";
import db from "../db.js";
import { authorize } from "../middleware/auth.js";
import { paginationSortingMiddleware } from "../middleware/paginationSortingMiddleware.js";

const router = express.Router();

router.get(
  "/",
  paginationSortingMiddleware(async () => db.data.authors),
  authorize("read"),
  (req, res) => {
    // Get all authors

    res.json(db.data.authors);
  }
);

router.get("/:authorID", authorize("read"), (req, res) => {
  // Get a authors by ID

  const authorID = Number(req.params.authorID);

  const author = db.data.authors.find((a) => a.id === authorID);

  if (!author) {
    res.status(404).json({ message: "authors not found" });
    return;
  }

  res.json(author);
});

router.post("/", authorize("write"), async (req, res) => {
  // Add a new author

  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    res.status(400).json({
      message: "Missing required fields : first_name, last_name, email",
    });
    return;
  }
  const created_at = new Date().toISOString();
  const lastID = db.data.authors.reduce(
    (last, author) => Math.max(last, author.id),
    0
  );
  const newAuthor = {
    id: lastID + 1,
    first_name,
    last_name,
    email,
    created_at,
  };

  db.data.authors.push(newAuthor);
  await db.write();

  res.status(201).json(newAuthor);
});

router.put("/:authorID", authorize("write"), async (req, res) => {
  // Update a posts by ID
  const authorID = Number(req.params.authorID);

  const author = db.data.authors.find((a) => a.id === authorID);

  if (!author) {
    res.status(404).json({ message: "Author not found" });
    return;
  }

  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    res.status(400).json({
      message: "Missing required fields: first_name, last_name, email",
    });
    return;
  }

  const created_at = new Date().toISOString();

  author.first_name = first_name;
  author.last_name = last_name;
  author.email = email;
  author.created_at = created_at;

  await db.write();

  res.json(author);
});

router.delete("/:authorID", authorize("delete"), async (req, res) => {
  // Delete a authors by ID
  const authorID = Number(req.params.authorID);

  const index = db.data.authors.findIndex((a) => a.id === authorID);

  if (index === -1) {
    res.status(404).json({ message: "author not found" });
    return;
  }

  db.data.authors.splice(index, 1);
  await db.write();

  res.status(204).end();
});

export const authorsRouter = router;
