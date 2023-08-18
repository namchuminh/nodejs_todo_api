const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/', authMiddleware, userController.index);
router.post('/', authMiddleware, userController.update);



module.exports = router;