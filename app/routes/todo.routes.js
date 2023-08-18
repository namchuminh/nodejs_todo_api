const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.post('/add', authMiddleware, todoController.add);
router.post('/delete', authMiddleware, todoController.delete);
router.get('/', authMiddleware, todoController.index);
router.get('/:id', authMiddleware, todoController.detail);
router.post('/:id', authMiddleware, todoController.update);


module.exports = router;