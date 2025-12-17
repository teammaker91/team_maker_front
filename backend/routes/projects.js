import express from "express";
import { auth } from "../middleware/auth.js";
import projects from "../data/projects.js";

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json(projects);
});

router.post("/", auth, (req, res) => {
  const { name, category } = req.body;

  const newProject = {
    id: Date.now(),
    name,
    category,
    owner: req.user.id
  };

  projects.push(newProject);
  res.json(newProject);
});

export default router;
