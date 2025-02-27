const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// API lấy danh sách môn học
router.get('/subjects', authenticateToken, async (req, res) => {
    try {
        const [subjects] = await db.query('SELECT SubjectID, SubjectName FROM Subjects');
        
        if (!subjects || subjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy môn học nào trong hệ thống'
            });
        }

        res.json({ 
            success: true, 
            subjects,
            message: 'Lấy danh sách môn học thành công'
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách môn học:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi server khi lấy danh sách môn học',
            error: error.message 
        });
    }
});

// API tạo bài kiểm tra mới
router.post('/create-exam', authenticateToken, async (req, res) => {
    const { examName, subjectId, startDate, endDate } = req.body;
    const teacherId = req.user.id;

    if (!examName || !subjectId || !startDate || !endDate) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng cung cấp đầy đủ thông tin bài kiểm tra'
        });
    }

    try {
        const [subject] = await db.query(
            'SELECT SubjectID FROM Subjects WHERE SubjectID = ?',
            [subjectId]
        );

        if (!subject || subject.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Môn học không hợp lệ'
            });
        }

        const formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
        const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');

        const [result] = await db.query(
            'INSERT INTO Exams (ExamName, SubjectID, TeacherID, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)',
            [examName, subjectId, teacherId, formattedStartDate, formattedEndDate]
        );

        res.json({
            success: true,
            examId: result.insertId,
            message: 'Tạo bài kiểm tra thành công'
        });
    } catch (error) {
        console.error('Lỗi khi tạo bài kiểm tra:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo bài kiểm tra. Vui lòng thử lại.'
        });
    }
});

// API thêm môn học mới
router.post('/add-subject', authenticateToken, async (req, res) => {
    const { subjectName } = req.body;

    if (!subjectName) {
        return res.status(400).json({
            success: false,
            message: 'Tên môn học không được để trống'
        });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO Subjects (SubjectName) VALUES (?)',
            [subjectName]
        );

        res.json({
            success: true,
            message: 'Thêm môn học thành công',
            subjectId: result.insertId
        });
    } catch (error) {
        console.error('Lỗi khi thêm môn học:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi thêm môn học. Vui lòng thử lại.'
        });
    }
});

// API lấy chi tiết bài kiểm tra
router.get('/exam-details/:examId', authenticateToken, async (req, res) => {
    const { examId } = req.params;

    if (!examId || isNaN(examId)) {
        return res.status(400).json({
            success: false,
            message: 'ID bài kiểm tra không hợp lệ'
        });
    }

    try {
        const [exam] = await db.query(
            `SELECT e.ExamID, e.ExamName, e.StartDate, e.EndDate, 
            s.SubjectID, s.SubjectName, 
            u.UserID as TeacherID, CONCAT(u.FirstName, ' ', u.LastName) AS TeacherName
            FROM Exams e
            JOIN Subjects s ON e.SubjectID = s.SubjectID
            JOIN Users u ON e.TeacherID = u.UserID
            WHERE e.ExamID = ?`,
            [examId]
        );

        if (exam.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông tin bài kiểm tra'
            });
        }

        res.json({
            success: true,
            examDetails: exam[0]
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bài kiểm tra:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy thông tin bài kiểm tra'
        });
    }
});

// API tạo câu hỏi và đáp án
router.post('/create-question', authenticateToken, async (req, res) => {
    const { examId, questions } = req.body;

    if (!examId || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Dữ liệu không hợp lệ'
        });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [exam] = await connection.query(
            'SELECT ExamID FROM Exams WHERE ExamID = ? AND TeacherID = ?',
            [examId, req.user.id]
        );

        if (!exam || exam.length === 0) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài kiểm tra hoặc bạn không có quyền chỉnh sửa'
            });
        }

        for (const question of questions) {
            const [questionResult] = await connection.query(
                'INSERT INTO Questions (ExamID, QuestionText, QuestionType) VALUES (?, ?, ?)',
                [examId, question.questionText, question.questionType || 'Multiple Choice']
            );

            const questionId = questionResult.insertId;

            for (const answer of question.answers) {
                await connection.query(
                    'INSERT INTO Answers (QuestionID, AnswerText, IsCorrect) VALUES (?, ?, ?)',
                    [questionId, answer.answerText, answer.isCorrect]
                );
            }
        }

        await connection.commit();

        res.json({
            success: true,
            message: 'Thêm câu hỏi thành công'
        });
    } catch (error) {
        await connection.rollback();
        console.error('Lỗi khi thêm câu hỏi:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi thêm câu hỏi. Vui lòng thử lại.'
        });
    } finally {
        connection.release();
    }
});

// API lấy lịch sử bài kiểm tra
router.get('/exam-history', authenticateToken, async (req, res) => {
    try {
        const [exams] = await db.query(
            `SELECT e.ExamID, e.ExamName, e.StartDate, e.EndDate, s.SubjectName
             FROM Exams e
             JOIN Subjects s ON e.SubjectID = s.SubjectID
             WHERE e.TeacherID = ?
             ORDER BY e.StartDate DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            exams
        });
    } catch (error) {
        console.error('Lỗi khi lấy lịch sử bài kiểm tra:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy lịch sử bài kiểm tra'
        });
    }
});

// API xóa bài kiểm tra
router.delete('/delete-exam/:examId', authenticateToken, async (req, res) => {
    const { examId } = req.params;
    const teacherId = req.user.id;

    if (!examId || isNaN(examId)) {
        return res.status(400).json({
            success: false,
            message: 'ID bài kiểm tra không hợp lệ'
        });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [exam] = await connection.query(
            'SELECT ExamID FROM Exams WHERE ExamID = ? AND TeacherID = ?',
            [examId, teacherId]
        );

        if (exam.length === 0) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài kiểm tra hoặc bạn không có quyền xóa'
            });
        }

        await connection.query('DELETE FROM Answers WHERE QuestionID IN (SELECT QuestionID FROM Questions WHERE ExamID = ?)', [examId]);
        await connection.query('DELETE FROM Questions WHERE ExamID = ?', [examId]);
        await connection.query('DELETE FROM StudentExams WHERE ExamID = ?', [examId]);
        await connection.query('DELETE FROM Exams WHERE ExamID = ?', [examId]);

        await connection.commit();

        res.json({
            success: true,
            message: 'Xóa bài kiểm tra thành công'
        });
    } catch (error) {
        await connection.rollback();
        console.error('Lỗi khi xóa bài kiểm tra:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa bài kiểm tra'
        });
    } finally {
        connection.release();
    }
});

// API lấy danh sách câu hỏi cho một bài kiểm tra cụ thể
router.get('/questions/:examId', authenticateToken, async (req, res) => {
    const { examId } = req.params;

    if (!examId || isNaN(examId)) {
        return res.status(400).json({
            success: false,
            message: 'ID bài kiểm tra không hợp lệ'
        });
    }

    try {
        const [rows] = await db.query(
            `SELECT 
                q.QuestionID, 
                q.QuestionText, 
                q.QuestionType,
                a.AnswerID,
                a.AnswerText,
                a.IsCorrect
            FROM Questions q
            LEFT JOIN Answers a ON q.QuestionID = a.QuestionID
            WHERE q.ExamID = ?
            ORDER BY q.QuestionID, a.AnswerID`,
            [examId]
        );

        const questions = [];
        const questionMap = new Map();

        rows.forEach(row => {
            if (!questionMap.has(row.QuestionID)) {
                questionMap.set(row.QuestionID, {
                    QuestionID: row.QuestionID,
                    QuestionText: row.QuestionText,
                    QuestionType: row.QuestionType,
                    Answers: []
                });
                questions.push(questionMap.get(row.QuestionID));
            }
            
            if (row.AnswerID) {
                questionMap.get(row.QuestionID).Answers.push({
                    AnswerID: row.AnswerID,
                    AnswerText: row.AnswerText,
                    IsCorrect: row.IsCorrect
                });
            }
        });

        res.json({
            success: true,
            questions
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách câu hỏi:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách câu hỏi',
            error: error.message
        });
    }
});

// API xóa câu hỏi
router.delete('/delete-question/:questionId', authenticateToken, async (req, res) => {
    const { questionId } = req.params;
    const teacherId = req.user.id;

    if (!questionId || isNaN(questionId)) {
        return res.status(400).json({
            success: false,
            message: 'ID câu hỏi không hợp lệ'
        });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [question] = await connection.query(
            `SELECT q.QuestionID 
             FROM Questions q
             JOIN Exams e ON q.ExamID = e.ExamID
             WHERE q.QuestionID = ? AND e.TeacherID = ?`,
            [questionId, teacherId]
        );

        if (question.length === 0) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy câu hỏi hoặc bạn không có quyền xóa'
            });
        }

        await connection.query('DELETE FROM Answers WHERE QuestionID = ?', [questionId]);
        await connection.query('DELETE FROM Questions WHERE QuestionID = ?', [questionId]);

        await connection.commit();

        res.json({
            success: true,
            message: 'Xóa câu hỏi thành công'
        });
    } catch (error) {
        await connection.rollback();
        console.error('Lỗi khi xóa câu hỏi:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa câu hỏi'
        });
    } finally {
        connection.release();
    }
});

// API lấy tổng số bài kiểm tra
router.get('/total-exams', async (req, res) => {
    try {
        const [result] = await db.query('SELECT COUNT(*) as total FROM Exams');
        res.json({
            success: true,
            total: result[0].total
        });
    } catch (error) {
        console.error('Lỗi khi lấy tổng số bài kiểm tra:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tổng số bài kiểm tra'
        });
    }
});

// API lấy tổng số cuộc thi
router.get('/total-competitions', async (req, res) => {
    try {
        const [result] = await db.query('SELECT COUNT(*) as total FROM Competitions');
        res.json({
            success: true,
            total: result[0].total
        });
    } catch (error) {
        console.error('Lỗi khi lấy tổng số cuộc thi:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tổng số cuộc thi'
        });
    }
});

module.exports = router;