const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const {
      Username,
      Password,
      Role,
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      DateOfBirth,
      Gender,
  } = req.body;

  if (!Username || !Password || !Role || !FirstName || !LastName || !Email) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
  }

  try {
      const [existingUser] = await db.query(
          "SELECT * FROM Users WHERE Username = ? OR Email = ?",
          [Username, Email]
      );

      if (existingUser.length > 0) {
          return res
              .status(400)
              .json({ message: "Tên đăng nhập hoặc Email đã tồn tại." });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      await db.query(
          "INSERT INTO Users (Username, Password, Role, FirstName, LastName, Email, PhoneNumber, DateOfBirth, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
              Username,
              hashedPassword,
              Role,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              DateOfBirth,
              Gender,
          ]
      );

      res.status(201).json({
          message: "Đăng ký thành công.",
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Lỗi hệ thống. Vui lòng thử lại sau.",
      });
  }
});

router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  try {
      const [users] = await db.query("SELECT * FROM Users WHERE Username = ?", [Username]);

      if (users.length === 0) {
          return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng." });
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(Password, user.Password);

      if (!isMatch) {
          return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng." });
      }

      const token = jwt.sign({ id: user.UserID, role: user.Role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ 
          message: "Đăng nhập thành công.", 
          token, 
          role: user.Role,
          name: `${user.FirstName} ${user.LastName}`
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi hệ thống. Vui lòng thử lại sau." });
  }
});

module.exports = router;

