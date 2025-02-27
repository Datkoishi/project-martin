Dưới đây là các lệnh terminal để kiểm tra bộ câu hỏi trong cơ sở dữ liệu MySQL:

1. Đầu tiên, kết nối với MySQL (thay thế `your_username` bằng tên người dùng MySQL của bạn):


```plaintext
mysql -u your_username -p
```

Sau khi nhập lệnh này, bạn sẽ được yêu cầu nhập mật khẩu.

2. Sau khi đăng nhập thành công, chọn cơ sở dữ liệu của bạn (thay thế `your_database` bằng tên cơ sở dữ liệu của bạn):


```plaintext
USE your_database;
```

3. Hiển thị danh sách các bảng trong cơ sở dữ liệu:


```plaintext
SHOW TABLES;
```

4. Kiểm tra dữ liệu trong bảng Questions:


```plaintext
SELECT * FROM Questions ORDER BY ExamID DESC LIMIT 10;
```

Lệnh này sẽ hiển thị 10 câu hỏi mới nhất.

5. Kiểm tra dữ liệu trong bảng Answers cho một câu hỏi cụ thể (thay thế `question_id` bằng ID của câu hỏi bạn muốn kiểm tra):


```plaintext
SELECT * FROM Answers WHERE QuestionID = question_id;
```

6. Để xem câu hỏi và câu trả lời cùng nhau, bạn có thể sử dụng lệnh sau:


```plaintext
SELECT q.QuestionID, q.QuestionText, a.AnswerText, a.IsCorrect
FROM Questions q
JOIN Answers a ON q.QuestionID = a.QuestionID
WHERE q.ExamID = (SELECT MAX(ExamID) FROM Exams)
ORDER BY q.QuestionID, a.AnswerID;
```

Lệnh này sẽ hiển thị câu hỏi và câu trả lời cho bài kiểm tra mới nhất.