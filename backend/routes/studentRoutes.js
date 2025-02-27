const express = require('express');
const path = require('path');
const router = express.Router();

const studentPath = path.join(__dirname, '..', '..', 'frontend', 'student');

router.get('/404', (req, res) => res.sendFile(path.join(studentPath, '404.html')));
router.get('/about', (req, res) => res.sendFile(path.join(studentPath, 'about.html')));
router.get('/blog', (req, res) => res.sendFile(path.join(studentPath, 'blog.html')));
router.get('/choiceclass', (req, res) => res.sendFile(path.join(studentPath, 'choiceclass.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(studentPath, 'contact.html')));
router.get('/history', (req, res) => res.sendFile(path.join(studentPath, 'history.html')));
router.get('/login', (req, res) => res.sendFile(path.join(studentPath, 'login.html')));
router.get('/option_oj', (req, res) => res.sendFile(path.join(studentPath, 'option_oj.html')));
router.get('/register', (req, res) => res.sendFile(path.join(studentPath, 'register.html')));

module.exports = router;
