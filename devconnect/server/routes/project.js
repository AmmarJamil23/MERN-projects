const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, techStack, githubLink, livelink } = req.body;

    const newProject = new Project({
      user: req.user,
      title,
      description,
      techStack,
      githubLink,
      livelink,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const myProjects = await Project.find({ user: req.user });
    res.json(myProjects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
