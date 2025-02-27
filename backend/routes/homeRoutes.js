const express = require('express');
const path = require('path');
const router = express.Router();

const homePath = path.join(__dirname, '..', '..', 'frontend', 'Home');

router.get('/', (req, res) => res.sendFile(path.join(homePath, 'index.html')));
router.get('/404', (req, res) => res.sendFile(path.join(homePath, '404.html')));
router.get('/about', (req, res) => res.sendFile(path.join(homePath, 'about.html')));
router.get('/blog', (req, res) => res.sendFile(path.join(homePath, 'blog.html')));
router.get('/choiceclass', (req, res) => res.sendFile(path.join(homePath, 'choiceclass.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(homePath, 'contact.html')));
router.get('/history', (req, res) => res.sendFile(path.join(homePath, 'history.html')));
router.get('/login', (req, res) => res.sendFile(path.join(homePath, 'login.html')));
router.get('/option_oj', (req, res) => res.sendFile(path.join(homePath, 'option_oj.html')));
router.get('/register', (req, res) => res.sendFile(path.join(homePath, 'register.html')));

module.exports = router;
