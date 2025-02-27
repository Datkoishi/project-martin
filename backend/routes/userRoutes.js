const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
      const [users] = await db.query(
          `SELECT UserID, Username, FirstName, LastName, Email, 
          PhoneNumber, DateOfBirth, Gender, Role 
          FROM Users WHERE UserID = ?`,
          [req.user.id]
      );

      if (users.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng.' });
      }

      res.json(users[0]);
  } catch (error) {
      console.error('Lỗi khi lấy thông tin profile:', error);
      res.status(500).json({ message: 'Lỗi server.' });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  const {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      DateOfBirth,
      Gender
  } = req.body;

  try {
      const [existingUsers] = await db.query(
          'SELECT UserID FROM Users WHERE Email = ? AND UserID != ?',
          [Email, req.user.id]
      );

      if (existingUsers.length > 0) {
          return res.status(400).json({ message: 'Email đã được sử dụng.' });
      }

      await db.query(
          `UPDATE Users SET 
          FirstName = ?, 
          LastName = ?, 
          Email = ?, 
          PhoneNumber = ?, 
          DateOfBirth = ?, 
          Gender = ? 
          WHERE UserID = ?`,
          [FirstName, LastName, Email, PhoneNumber, DateOfBirth, Gender, req.user.id]
      );

      res.json({ message: 'Cập nhật thông tin thành công.' });
  } catch (error) {
      console.error('Lỗi khi cập nhật profile:', error);
      res.status(500).json({ message: 'Lỗi server.' });
  }
});

router.put('/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
      const [users] = await db.query(
          'SELECT Password FROM Users WHERE UserID = ?',
          [req.user.id]
      );

      if (users.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
      }

      const isMatch = await bcrypt.compare(currentPassword, users[0].Password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query(
          'UPDATE Users SET Password = ? WHERE UserID = ?',
          [hashedPassword, req.user.id]
      );

      res.json({ message: 'Đổi mật khẩu thành công.' });
  } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      res.status(500).json({ message: 'Lỗi server.' });
  }
});

module.exports = router;

