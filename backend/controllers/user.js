const {User} = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const userData = {
        name: name,
        email: email,
        password: password
    }

    const foundEmail = await User.findOne({
        where: {
            email: req.body.password
        }
    })

    if (foundEmail) {
        res.status(400).json({
            message: 'Email sudah terpakai!'
        })
    } else {
        const addUser = await User.create(userData)
        return res.status(201).json({
            data: {
                name: name,
                email: email,
                password: addUser.password
            }
        })
    }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundPassword = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!foundPassword) {
    res.status(400).json({
        message: "Password atau email salah!"
    })
  }
  const validasi = bcrypt.compareSync(password, foundPassword.password);
  if (validasi) {
    const userData = {
      id: foundPassword.id,
      email: foundPassword.email,
    };
    var token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "12h" });
    return res.status(201).json({
      Token: token,
    });
  }
  return res.status(400).json({
    status: "Tidak terdaftar",
    message: "Coba lagi",
  });
};

const infoLogin = async (req, res) => {
  const id_user = req.user.id
  const cariUser = await User.findOne({
    attributes: ['id', 'name', 'email'],
    where: {
      id: id_user
    }
  })
  if (!cariUser) {
    return res.status(400).json({
      message: "User not found"
    })
  }
  return res.status(200).json({
    data: cariUser
  })
}

module.exports = {
    register,
    login,
    infoLogin
}