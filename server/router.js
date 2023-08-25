const express = require('express');
const router = express.Router();
const cors = require('cors');

//router.use(cors('localhost:3000'))

router.get('/', (req, res) => {
    res.send('server is up and running');
});

module.exports = router;