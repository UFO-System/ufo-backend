const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { emitDepositEvent } = require('../sockets/apiHandlers');

// API post로 받아오기
router.post('/deposit', function(req, res) {
  if (req.body.transaction_type === "deposited"){
    const data = transformData(req.body);
    console.log(data);
    emitDepositEvent(data);
  }
});

// 로그인 API
router.post('/login', (req, res) => {
    const { userid, password } = req.body;
    const query = '유저 찾는 쿼리';

    db.query(query, [userid], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Logged in successfully', token });
    });
});

// 회원가입 API
router.post('/register', (req, res) => {
    console.log(req.body);
    const { userid, password, name, account } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const query = '유저 추가 쿼리';

    db.query(query, [userid, hashedPassword, name, account], (err, result) => {
        if (err) {
            console.error('Error during registration:', err);
            return res.status(500).json({ message: 'Error during registration' });
        }
        res.status(201).json({ message: 'Registration successful' });
    });
});

// API json 매핑 함수
function transformData(input) {
    return {
        "bank": bankCodes[input.bank_code] || input.bank_code,
        "bank_account": input.account_number,
        "pay_name": input.deposited_name,
        "pay_price": input.amount
    };
}

const bankCodes = {
    "003": "기업은행",
    "004": "국민은행",
    "007": "수협중앙회",
    "011": "농협은행",
    "020": "우리은행",
    "023": "SC은행",
    "027": "한국씨티은행",
    "032": "부산은행",
    "034": "광주은행",
    "045": "새마을금고중앙회",
    "071": "우체국",
    "081": "KEB하나은행",
    "088": "신한은행"
};


module.exports = router;