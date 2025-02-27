const express = require('express');
const path = require('path');
const router = express.Router();

const teacherPath = path.join(__dirname, '..', '..', 'frontend', 'teacher');

// Định nghĩa các routes cho teacher
router.get('/404', (req, res) => res.sendFile(path.join(teacherPath, '404.html')));
router.get('/about', (req, res) => res.sendFile(path.join(teacherPath, 'about.html')));
router.get('/blog', (req, res) => res.sendFile(path.join(teacherPath, 'blog.html')));
router.get('/choice-creative', (req, res) => res.sendFile(path.join(teacherPath, 'choice_creative.html')));
router.get('/choice-obj', (req, res) => res.sendFile(path.join(teacherPath, 'choice_obj.html')));
router.get('/choiceclass', (req, res) => res.sendFile(path.join(teacherPath, 'choiceclass.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(teacherPath, 'contact.html')));
router.get('/creative-quiz', (req, res) => res.sendFile(path.join(teacherPath, 'creative_quiz.html')));
router.get('/history-cr', (req, res) => res.sendFile(path.join(teacherPath, 'history_cr.html')));
router.get('/history', (req, res) => res.sendFile(path.join(teacherPath, 'history.html')));
router.get('/list-cr-quiz', (req, res) => res.sendFile(path.join(teacherPath, 'list_cr_quiz.html')));
router.get('/oj-creative', (req, res) => {
    const filePath = path.join(teacherPath, 'oj_creative.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).sendFile(path.join(teacherPath, '404.html'));
        }
    });
});
router.get('/option-oj', (req, res) => res.sendFile(path.join(teacherPath, 'option_oj.html')));

// Thêm route mặc định cho teacher
router.get('/', (req, res) => res.sendFile(path.join(teacherPath, 'index.html')));

// Xử lý lỗi file không tồn tại
router.use((err, req, res, next) => {
    if (err.code === 'ENOENT') {
        res.status(404).sendFile(path.join(teacherPath, '404.html'));
    } else {
        next(err);
    }
});

module.exports = router;

