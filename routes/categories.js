import express from "express";
import db from "../db.js";
import { authorize } from "../middleware/auth.js";
import { paginationSortingMiddleware } from "../middleware/paginationSortingMiddleware.js";

const router = express.Router();

router.get(
  "/",
  paginationSortingMiddleware(async () => db.data.categories),
  authorize("read"),
  (req, res) => {
    // Get all posts

    res.json(db.data.categories);
  }
);

router.get("/:categoryID", authorize("read"), (req, res) => {
  // Get a posts by ID

  const categoryID = Number(req.params.categoryID);

  const category = db.data.categories.find((p) => p.id === categoryID);

  if (!category) {
    res.status(404).json({ message: "category not found" });
    return;
  }

  res.json(category);
});

router.post("/", authorize("write"), async (req, res) => {
  // Add a new category

  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Missing required fields : Name",
    });
    return;
  }

  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();
  const lastID = db.data.categories.reduce(
    (last, category) => Math.max(last, category.id),
    0
  );

  const newCategory = {
    id: lastID + 1,
    name,
    created_at,
    updated_at,
  };

  db.data.categories.push(newCategory);
  await db.write();

  res.status(201).json(newCategory);
});

router.put("/:categoryID", authorize("write"), async (req, res) => {
  // Update a category by ID
  const categoryID = Number(req.params.categoryID);

  const category = db.data.categories.find((c) => c.id === categoryID);

  if (!category) {
    res.status(404).json({ message: "category not found" });
    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Missing required fields: name",
    });
    return;
  }
  const updated_at = new Date().toISOString();

  category.name = name;
  category.updated_at = updated_at;

  await db.write();

  res.json(category);
});

router.delete("/:categoryID", authorize("delete"), async (req, res) => {
  // Delete a categories by ID
  const categoryID = Number(req.params.categoryID);

  const index = db.data.categories.findIndex((c) => c.id === categoryID);

  if (index === -1) {
    res.status(404).json({ message: "category not found" });
    return;
  }

  db.data.categories.splice(index, 1);
  await db.write();

  res
    .status(204)
    .json({
      message: "Deleted",
    })
    .end();
});

export const categoriesRouter = router;
