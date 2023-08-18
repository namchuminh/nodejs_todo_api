const Todo = require("../models/todo.model.js");

class todoController {
    //[GET] /todo/
    async index(req, res) {
        const todo = await Todo.findAll({
            where: { user: req.user.username },
            order: [
                ['id', 'DESC']
            ]
        });
        return res.json({ todo });
    }

    //[GET] /todo/:id
    async detail(req, res) {
        const id = req.params.id;
        const todo = await Todo.findOne({ where: { id, user: req.user.username } });
        return res.status(200).json({ todo });
    }

    //[POST] /todo/add
    async add(req, res) {

        const { taskName, taskDecription, taskStatus, taskType, taskImportant, startDate, endDate, listDetail } = req.body;

        if (taskName == "" || taskDecription == "" || startDate == "" || endDate == "" || listDetail.length <= 0 || listDetail[0] == '') {
            return res.status(400).json({ "error": "Vui lòng nhập đủ thông tin!" });
        }
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ "error": "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!" });
        }

        try {
            const data = {
                name: taskName,
                user: req.user.username,
                decription: taskDecription,
                status: taskStatus,
                type: taskType,
                important: taskImportant,
                start: startDate,
                end: endDate,
                list: listDetail.join('#')
            }
            const newTodo = await Todo.create(data);
            if (!newTodo) return res.status(400).json({ error: 'Có lỗi khi thêm mới Todo!' });

            const resData = {
                ...data,
                id: newTodo.id
            }

            return res.status(201).json({ "message": "Thêm Todo thành công!", "todo": resData });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    //[POST] /todo/:id
    async update(req, res) {
        try {
            const id = req.params.id;

            const { taskName, taskDecription, taskStatus, taskType, taskImportant, startDate, endDate, listDetail } = req.body;


            if (taskName == "" || taskDecription == "" || startDate == "" || endDate == "" || listDetail.length <= 0 || listDetail[0] == '') {
                return res.status(400).json({ "error": "Vui lòng nhập đủ thông tin!" });
            }
            if (new Date(startDate) >= new Date(endDate)) {
                return res.status(400).json({ "error": "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!" });
            }

            const data = {
                name: taskName,
                user: req.user.username,
                decription: taskDecription,
                status: taskStatus,
                type: taskType,
                important: taskImportant,
                start: startDate,
                end: endDate,
                list: listDetail.join('#')
            }

            if (!await Todo.update(data, { where: { id } })) return res.status(400).json({ error: 'Có lỗi khi cập nhật Todo!' });

            return res.status(200).json({ "message": "Cập nhật Todo thành công!", "todo": data });

        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    //[POST] /todo/delete
    async delete(req, res) {
        try {
            const { id } = req.body;
            
            const todo = await Todo.findOne({ where: { id, user: req.user.username } });
            if (!todo) return res.status(404).json({ error: 'Todo không hợp lệ!' });

            if (!await Todo.destroy({ where: { id } })) return res.status(204).json({ error: 'Có lỗi khi xóa Todo!' });

            return res.status(200).json({ "message": "Xóa Todo thành công!" });
        } catch (error) {
            return res.status(500).json({ error });
        }

    }
}

module.exports = new todoController();