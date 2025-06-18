const {User} = require("../models")

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
            data: userData
        })
    }
}

module.exports = {
    register
}