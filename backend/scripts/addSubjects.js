const db = require('../config/db');

const subjects = [
    'Toán học',
    'Ngữ văn',
    'Tin học',
    'Tiếng Anh'
];

async function addSubjects() {
    try {
        for (const subject of subjects) {
            await db.promise().query('INSERT INTO Subjects (SubjectName) VALUES (?)', [subject]);
            console.log(`Đã thêm môn học: ${subject}`);
        }
        console.log('Hoàn tất thêm môn học');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi thêm môn học:', error);
        process.exit(1);
    }
}

addSubjects();

