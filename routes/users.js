import express from "express";
import db from "../db.js";
import { authorize } from "../middleware/auth.js";
import { upload } from "../middleware/photoMiddle.js";

const router = express.Router();

router.get("/", authorize("read"), (req, res) => {
  // Get all users

  res.json(db.data.users);
});

router.get("/:usersID", authorize("admin"), (req, res) => {
  // Get a user by ID

  const usersID = Number(req.params.usersID);

  const user = db.data.users.find((a) => a.id === usersID);

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  res.json(user);
});

router.post(
  "/",
  authorize("admin"),
  upload.single("photo"),
  async (req, res) => {
    // Add a new author

    const { name, role, permissions } = req.body;

    if (!name || !role || !permissions) {
      res.status(400).json({
        message: "Missing required fields : name, role, permissions",
      });
      return;
    }

    const newUser = {
      id: db.data.users.length + 1,
      name,
      role,
      permissions,
      photo: req.file.filename,
    };

    db.data.users.push(newUser);
    await db.write();

    res.status(201).json(newUser);
  }
);

router.put("/:usersID", authorize("admin"), async (req, res) => {
  // Update a user by ID
  const usersID = Number(req.params.usersID);

  const user = db.data.users.find((a) => a.id === usersID);

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  const { name, role, permissions } = req.body;

  if (!name || !role || !permissions) {
    res.status(400).json({
      message: "Missing required fields: name, role, permissions",
    });
    return;
  }

  user.name = name;
  user.role = role;
  user.permissions = permissions;

  await db.write();

  res.json(user);
});

router.delete("/:userID", authorize("admin"), async (req, res) => {
  // Delete a user by ID
  const userID = Number(req.params.userID);

  const index = db.data.users.findIndex((a) => a.id === userID);

  if (index === -1) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  db.data.users.splice(index, 1);
  await db.write();

  res.status(204).end();
});

export const usersRouter = router;
