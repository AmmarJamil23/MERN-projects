const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async(req, res) => {
    try {
        const { title, description, techStack, githubLink, liveLink} = req.body;
        const newProject = new Project({
            user: req.user,
            title,
            description,
            techStack,
            githubLink,
            liveLink,

        });
        await newProject.save();
        res.status(201).json(newProject);

    } catch (err){
        res.status(500).json({ message: 'Server error '});

    }
});

//Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('user', 'name email');
        res.join(projects);

    } catch (err) {
        res.status(500).json({ message: 'Server Error'});

    }
});

//Get logged-in to user's project
router.get('/my', auth, async (req, res) => {
    try {
        const myProjects = await Project.find({ user: req.user });
        res.json(myProjects);

    } catch (err) {
        res.status(500).json({ message: 'Server error'});

    }
});

//Updatea project

router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await Project.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            {new: true }
        );
        if(!updated){
            return res.status(404).json({ message: 'Project not found'});
        }
        res.json(updated);

    } catch (err) {
        res.status(500).json({ message: 'Server error'});

    }
});

//Delete a project
router.delete('/:id', auth, async (req, res) => {
    try {
        const deleted = await Project.findOneAndDelete({ _id: req.params.id, user: req.user});
        if(!deleted){
            return res.status(404).json({message: 'Prooject not found'});
        }
        res.json({message: 'Project deleted '});

    } catch (err){
        res.status(500).json({ message: 'Server error '});

    }

});

module.exports = router;