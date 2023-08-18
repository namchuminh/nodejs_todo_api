const User = require("../models/users.model.js");
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

class userController {
  //[GET] /users/
  async index(req, res) {
    const users = await User.findOne({ where: { username: req.user.username } });
    return res.status(200).json({ users });
  }

  //[POST] /users/
  async update(req, res) {
    try {
      const { fullname, password, repassword } = req.body;

      const user = await User.findOne({ where: { username: req.user.username } });
      if (!user) return res.status(404).json({ error: 'Tài khoản không tồn tại!' });


      if (fullname == "" || fullname == undefined) return res.status(400).json({ error: 'Vui lòng không bỏ trống họ tên!' });

      if (password !== "") {
        if (repassword == "") {
          return res.status(400).json({ error: 'Vui lòng xác nhận mật khẩu!' });
        }
      } else if (repassword !== "") {
        if (password == "") {
          return res.status(400).json({ error: 'Vui lòng nhập mật khẩu cần đổi!' });
        }
      }

      if (password !== "" && repassword !== "") {
        if (password != repassword) {
          return res.status(400).json({ error: 'Mật khẩu nhập không trùng khớp!' });
        }
      }

      const data = { username: req.user.username, fullname }

      if (!await User.update(data, { where: { username: req.user.username } })) return res.status(400).json({ error: 'Có lỗi khi cập nhật thông tin!' });

      return res.status(200).json({ "message": "Cập nhật tài khoản thành công!", "users": data });

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  //[POST] /users/login/
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username: username } });
      if (!user) return res.status(404).json({ error: 'Tài khoản không tồn tại!' });

      try {
        const hash = await argon2.hash(password);
        if (!await argon2.verify(hash, user.password)) return res.status(404).json({ error: 'Mật khẩu không đúng!' });
      } catch (err) {
        return res.status(404).json({ error: 'Mật khẩu không đúng!' });
      }

      const secretKey = 'ABC';
      const expiresIn = '1h';

      const access_token = jwt.sign({ username }, secretKey, { expiresIn });
      const refresh_token = jwt.sign({ username }, secretKey, { expiresIn });

      return res.status(200).json({ access_token, refresh_token })
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  //[POST] /users/register/
  async register(req, res) {
    try {
      const { fullname, username, password, repassword } = req.body;
      const user = await User.findOne({ where: { username: username } });

      if (user) return res.status(409).json({ error: 'Tài khoản đăng ký đã tồn tại!' });
      if (password !== repassword) return res.status(400).json({ error: 'Mật khẩu không trùng khớp!' });
      if (!await User.create({ fullname, username, password })) return res.status(400).json({ error: 'Có lỗi khi đăng ký tài khoản!' });

      return res.status(201).json({ message: "Đăng ký tài khoản thành công!" })
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new userController();